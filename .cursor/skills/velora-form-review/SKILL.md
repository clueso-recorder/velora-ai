---
name: velora-form-review
description: Review a Velora form change for consistency, accessibility, and preserved behavior when asked to review a form change.
---

# Velora form review

Review a Velora form change for consistency, accessibility, and preserved behavior. Do not modify code.

## Workflow

1. Inspect the current task's form diff and nearby shared components (especially `src/components/template/contact-form.tsx` and the shared `Input`, `Label`, `Textarea`, and `Button` components it uses).
2. Check existing styling conventions: reuse of those shared components, semantic color tokens, and spacing patterns (no new hard-coded colors).
3. Check helper-text association: a stable `id` on the helper text and `aria-describedby` on the related input.
4. Check whether native `required`/`email` validation and the frontend-only demo disclosure are preserved unless the task explicitly changes them.
5. Distinguish code inspection from anything actually tested in a browser. Mark unverified checks honestly.

## Report

Return exactly three rows with columns **Check**, **Evidence**, **Result**. Cite files or exact attributes as evidence.

| Check | Evidence | Result |
| --- | --- | --- |
| Design consistency | files, tokens, or components inspected | pass / fail / unverified |
| Accessible helper text | `id` / `aria-describedby` (or their absence) | pass / fail / unverified |
| Existing behavior | `required`, `type="email"`, demo disclosure | pass / fail / unverified |
