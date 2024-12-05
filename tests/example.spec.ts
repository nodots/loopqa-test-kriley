import { test, expect } from '@playwright/test'

const BASE_URL = 'https://playwrite.localhost'

test('should display form validation message', async ({ page }) => {
  await page.goto(BASE_URL)

  const nameInput = page.locator('#_name')
  const emailInput = page.locator('#_email')
  const submitButton = page.locator('button[type="submit"]')

  await nameInput.fill('John Doe')
  await emailInput.fill('john.doe@example.com')
  await submitButton.click()

  const validationMessage = page.locator('div[style*="color: green"]')
  await expect(validationMessage).toHaveText('Form is valid')
})

test('should display form invalid message for incorrect name', async ({
  page,
}) => {
  await page.goto(BASE_URL)

  const nameInput = page.locator('#_name')
  const emailInput = page.locator('#_email')
  const submitButton = page.locator('button[type="submit"]')

  await nameInput.fill('John')
  await emailInput.fill('john.doe@example.com')
  await submitButton.click()

  const validationMessage = page.locator('div[style*="color: red"]')
  await expect(validationMessage).toHaveText('Form is invalid')
})

test('should display form invalid message for incorrect email', async ({
  page,
}) => {
  await page.goto(BASE_URL)

  const nameInput = page.locator('#_name')
  const emailInput = page.locator('#_email')
  const submitButton = page.locator('button[type="submit"]')

  await nameInput.fill('John Doe')
  await emailInput.fill('john.doe@com')
  await submitButton.click()

  const validationMessage = page.locator('div[style*="color: red"]')
  await expect(validationMessage).toHaveText('Form is invalid')
})
