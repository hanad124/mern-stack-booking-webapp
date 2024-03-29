import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to register", async ({ page }) => {
  const testEmail = `testemail${
    Math.floor(Math.random() * 9000) + 100
  }@gmail.com`;

  await page.goto(UI_URL);

  // Click on the register link.
  await page.getByRole("link", { name: "Sign In" }).click();
  await page
    .getByRole("button", { name: "Don't have an account? Register" })
    .click();
  // Fill out the form.
  await page.fill('input[name="firstName"]', "John");
  await page.fill('input[name="lastName"]', "Doe");
  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="password"]', "123456");
  await page.fill('input[name="confirmPassword"]', "123456");

  // Submit the form.
  await page.click('button[type="submit"]');
});

// login test
// test("should allow the user to login", async ({ page }) => {
//   await page.goto(UI_URL);

//   // get the sign in button
//   await page.getByRole("link", { name: "Sign In" }).click();

//   // Fill out the form.
//   await page.locator('input[name="email"]').fill("john@gmail.com");
//   await page.locator('input[name="password"]').fill("123456");

//   // Submit the form.
//   await page.click('button[type="submit"]');

//   await expect(page.getByText("logged in successfully")).toBeVisible();
// });
