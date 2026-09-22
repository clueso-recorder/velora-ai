---
name: form-review
description: Review a diff against Velora form conventions. Use when asked to run form-review or check a form/pricing UI change against repo rules.
---

# Form review

Walk the current diff against `.cursor/rules/velora-forms.mdc`.

For each check, report a three-column table: Check | Result | Evidence (file:line).
Include at least: shared components reused, colour tokens preserved, helper text associated for screen readers.
State what you could and could not verify.
