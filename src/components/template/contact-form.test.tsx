import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import { ContactForm } from "./contact-form";

const completeFields = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Tell us what you're building.",
};

async function fillFields(
  user: ReturnType<typeof userEvent.setup>,
  fields: Partial<typeof completeFields>,
) {
  if (fields.name !== undefined) {
    await user.type(screen.getByLabelText("Name"), fields.name);
  }
  if (fields.email !== undefined) {
    await user.type(screen.getByLabelText("Email"), fields.email);
  }
  if (fields.message !== undefined) {
    await user.type(screen.getByLabelText("Message"), fields.message);
  }
}

test("submitting the form replaces the card with the Message sent confirmation", async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  await fillFields(user, completeFields);
  await user.click(screen.getByRole("button", { name: "Send message" }));

  expect(
    screen.getByRole("heading", { name: "Message sent" }),
  ).toBeDefined();
  expect(
    screen.getByText(
      /Thanks for reaching out — we'll get back to you within one business day\./,
    ),
  ).toBeDefined();
  expect(screen.getByRole("button", { name: "Send another" })).toBeDefined();
  expect(screen.queryByLabelText("Name")).toBeNull();
  expect(screen.queryByRole("button", { name: "Send message" })).toBeNull();
});

test.each([
  {
    field: "name",
    fields: { email: completeFields.email, message: completeFields.message },
  },
  {
    field: "email",
    fields: { name: completeFields.name, message: completeFields.message },
  },
  {
    field: "message",
    fields: { name: completeFields.name, email: completeFields.email },
  },
] as const)(
  "required $field field blocks submission when empty",
  async ({ fields }) => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillFields(user, fields);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.queryByRole("heading", { name: "Message sent" })).toBeNull();
    expect(screen.getByLabelText("Name")).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Message")).toBeDefined();
    expect(screen.getByRole("button", { name: "Send message" })).toBeDefined();
  },
);

test("Send another returns the user to an empty form", async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  await fillFields(user, completeFields);
  await user.click(screen.getByRole("button", { name: "Send message" }));
  await user.click(screen.getByRole("button", { name: "Send another" }));

  expect(screen.getByLabelText("Name")).toHaveProperty("value", "");
  expect(screen.getByLabelText("Email")).toHaveProperty("value", "");
  expect(screen.getByLabelText("Message")).toHaveProperty("value", "");
  expect(screen.getByRole("button", { name: "Send message" })).toBeDefined();
  expect(screen.queryByRole("heading", { name: "Message sent" })).toBeNull();
});
