import { Page, expect } from '@playwright/test'
import { ASANA_CREDENTIALS } from './index.spec'

export async function _login(page: Page): Promise<void> {
  try {
    await page.goto(ASANA_CREDENTIALS.baseUrl)

    const form = page.locator('form')
    await expect(form).toBeVisible({ timeout: 5000 })

    const usernameField = page.locator('#username')
    const passwordField = page.locator('#password')
    const submitButton = page.locator('button[type="submit"]')

    await expect(usernameField).toBeVisible({ timeout: 5000 })
    await expect(passwordField).toBeVisible({ timeout: 5000 })
    await expect(submitButton).toBeVisible({ timeout: 5000 })

    await usernameField.fill(ASANA_CREDENTIALS.username)
    await passwordField.fill(ASANA_CREDENTIALS.password)
    await submitButton.click()

    // Wait for navigation to complete and check if the login was successful
  } catch (error) {
    console.error('Login failed:', error)
    throw new Error(
      'Login process failed. Please check the credentials and the login page.'
    )
  }
}
