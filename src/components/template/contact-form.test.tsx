import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ContactForm } from "./contact-form";

const validValues = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "We're building an analytics dashboard.",
};

async function fillFields(
  user: ReturnType<typeof userEvent.setup>,
  values: Partial<typeof validValues> = validValues,
) {
  const fields = {
    Name: values.name,
    Email: values.email,
    Message: values.message,
  } as const;

  for (const [label, value] of Object.entries(fields)) {
    if (!value) continue;
    await user.type(screen.getByLabelText(label), value);
  }
}

async function submitForm(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /send message/i }));
}

describe("ContactForm", () => {
  it("replaces the form with a Message sent confirmation after submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillFields(user);
    await submitForm(user);

    expect(
      screen.getByRole("heading", { name: "Message sent" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/thanks for reaching out/i),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /send message/i }),
    ).not.toBeInTheDocument();
  });

  it("blocks submission when name, email, and message are empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("Message")).toBeRequired();

    await submitForm(user);

    expect(
      screen.queryByRole("heading", { name: "Message sent" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });

  it.each([
    { field: "Name" },
    { field: "Email" },
    { field: "Message" },
  ] as const)("blocks submission when $field is empty", async ({ field }) => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillFields(user, {
      name: field === "Name" ? "" : validValues.name,
      email: field === "Email" ? "" : validValues.email,
      message: field === "Message" ? "" : validValues.message,
    });
    await submitForm(user);

    expect(
      screen.queryByRole("heading", { name: "Message sent" }),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText(field)).toBeInTheDocument();
  });

  it("returns to an empty form after Send another", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillFields(user);
    await submitForm(user);
    await user.click(screen.getByRole("button", { name: /send another/i }));

    expect(
      screen.queryByRole("heading", { name: "Message sent" }),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });
});
