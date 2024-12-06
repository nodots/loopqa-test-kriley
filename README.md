# Loop Technical Evaluation

Author: Ken Riley <kenr@nodots.com>
Date: 2024.12.05

## Introduction

Create a Playwright-driven test suite that leverages data-driven techniques to minimize code duplication and improve scalability. By driving test scenarios from a JSON object, we can dynamically adapt each test case without repeating code, ensuring a clean and maintainable structure as new cases are added.

## Implementation Details

### TypeScript types and interfaces

### JSON object for testing

### Bare minimum DOM-parsing

## Challenges and Solutions

The key challenge in testing this code is isolating discreet sections of the DOM to ensure we are checking for elements/strings in the right place. For example, we need to check for both for "Design" as a tag and
"Design system updates" as a task title.

To this end we need to isolate:

- Board: Groups of Swimlanes
- Swimlane: Groups of Asana Stories that have the same status
- Stories: Descriptions of things that need to be done
- Tags: User-defined strings that provide searchable information for the story

While it is a best-practice to test only [user-visible behavior](https://playwright.dev/docs/best-practices#test-user-visible-behavior), achieving this required some DOM parsing. To isolate this as much as possible I wrote a `getSwimlanes` helper function that uses very basic selectors that is run before each test. If there is a change in the DOM of the target page, this will at least break cleanly and in a way that is easy to fix.

## Results

TKTK Summary of test run outcomes, noting any failures.

## Recommendations

Consider adding the [Asana TypeScript types](https://www.npmjs.com/package/@types/asana) to improve the `getSwimlanes` function. The downside is that it creates a [third-party dependency](https://playwright.dev/docs/best-practices#avoid-testing-third-party-dependencies), which is why I chose to create very simple types that describe the how Swimlanes/Stories/Tags are related in the presentation layer.
