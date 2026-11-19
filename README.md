# wdio-mocha-chai-e2e
End-to-end test automation framework for Toolshop, built with WebdriverIO, Mocha and Chai using the Page Object Model (POM) design pattern.

## Tech Stack:
- WebdriverIO v10 - browser automation.
- Mocha - test framework.
- Chai - assertions (Assert, Should, Expect).
- JavaScript (ES Modules).
- Google Chrome - test browser.

## Test Scenarios
The framework covers eight E2E scenarios:
1. User login with valid credentials
2. Product details verification
3. Product search
4. Product category filtering
5. Product sorting by price (low to high)
6. Adding a product to favorites
7. Updating product quantity and verifying the basket total
8. German language persistence after navigating to the Contact page

## Environment Setup
1. Install Node.js 24 (recommended) and Google Chrome.
**2.** Install project dependencies:
```bash
npm install
```
**3.** Create a `.env` file in the project root using `.env.example` as a template.
Configure the following environment variables:
```env
REGULAR_USER_1_EMAIL=
REGULAR_USER_1_PASSWORD=
REGULAR_USER_1_NAME=
```
(Provide valid Toolshop test user credentials and the corresponding full name.)

## Running Tests
Run all E2E tests:
```bash
npm run wdio
```

Run a specific test:
```bash
npm run wdio -- --spec ./src/tests/login.tests.js
```

Tests run in Google Chrome and results are displayed in the terminal using the WebdriverIO Spec Reporter.
