---
name: demo-test-review
description: Use this skill when asked to review test coverage for a changed feature.
---

# Demo Test Review

Review test coverage for a changed feature. Do not edit code. Do not claim to have run tests.

## Workflow

1. Inspect the feature diff (changed files and behavior).
2. Inspect nearby tests for those files and behaviors.
3. Identify uncovered behavior and edge cases.
4. Return a short coverage checklist with file references.

## Output

A concise checklist only: covered vs uncovered behaviors/edge cases, each with file references (source and any related tests). No patches, no invented test results.
