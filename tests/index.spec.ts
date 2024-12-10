import { expect, Page, test } from '@playwright/test'
import dotenv from 'dotenv'
import { getSwimlanes } from './dom-helpers'
import { AsanaCredentials } from './types'
// import { TestData } from './test-data'
dotenv.config({ path: '../.env' })

export const ASANA_CREDENTIALS: AsanaCredentials = {
  baseUrl:
    process.env.ASANA_BASE_URL ||
    'https://animated-gingersnap-8cf7f2.netlify.app',
  username: process.env.ASANA_USERNAME || 'admin',
  password: process.env.ASANA_PASSWORD || 'password123',
}

test.beforeEach(async ({ page }) => {
  await _login(page)
})

test('should display the correct swimlanes', async ({ page }) => {
  const swimlanes = await getSwimlanes(page)
  swimlanes.forEach((swimlane) => {
    console.log(swimlane.kind)
    console.log(swimlane.stories)
  })

  expect(swimlanes.length).toBe(4)
})

async function _login(page: Page): Promise<void> {
  await page.goto(ASANA_CREDENTIALS.baseUrl)
  const form = page.locator('form')
  expect(form).toBeTruthy()
  const usernameField = page.locator('#username')
  const passwordField = page.locator('#password')
  const submitButton = page.locator('button[type="submit"]')
  expect(usernameField).toBeTruthy()
  expect(passwordField).toBeTruthy()
  expect(submitButton).toBeTruthy()

  await usernameField.fill(ASANA_CREDENTIALS.username)
  await passwordField.fill(ASANA_CREDENTIALS.password)
  await submitButton.click()
  return
}
