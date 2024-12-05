import { test, expect, ElementHandle } from '@playwright/test'
import { exec } from 'child_process'
import exp from 'constants'

interface AsanaCredentials {
  baseUrl: string
  username: string
  password: string
}

const ASANA_CREDENTIALS: AsanaCredentials = {
  baseUrl: 'https://animated-gingersnap-8cf7f2.netlify.app/',
  username: 'admin',
  password: 'password123',
}

// Implement login automation for Asana using the following credentials:
// Demo App: https://animated-gingersnap-8cf7f2.netlify.app/
// Email: admin
// Password: password123
// The script should input these credentials into the login form and submit it successfully.

test.beforeEach(async ({ page }) => {
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
})

interface AsanaTodoItem {
  title: string
  description: string
  tags: string[]
}

// Test Case 1
// 1  - Login to Demo App.
// 2  - Navigate to "Web Application."
// 3  - Verify "Implement user authentication" is in the "To Do" column.
// 4  - Confirm tags: "Feature" "High Priority”
test('Test Case 1', async ({ page }) => {
  await page.click('text=Web Application')
  await page.waitForSelector('text=Implement user authentication')
  await page.waitForSelector('text=To Do')
  await page.waitForSelector('text=Feature')
  await page.waitForSelector('text=High Priority')
})

// Test Case 2
// Login to Demo App.
// Navigate to "Web Application."
// Verify "Fix navigation bug" is in the "To Do" column.
// Confirm tags: "Bug"
test('Test Case 2', async ({ page }) => {
  await page.click('text=Web Application')
  await page.waitForSelector('text=Fix navigation bug')
  await page.waitForSelector('text=Bug')
})

// Test Case 3
// Login to Demo App.
// Navigate to "Web Application."
// Verify "Design system updates" is in the "In Progress" column.
// Confirm tags: "Design”

test('Test Case 3', async ({ page }) => {
  await page.click('text=Web Application')
  await page.waitForSelector('text=Design system updates')
  await page.waitForSelector('text=In Progress')
  await page.waitForSelector('text=Design')
})

// Test Case 4
// Login to Demo App.
// Navigate to "Mobile Application."
// Verify "Push notification system" is in the "To Do" column.
// Confirm tags: "Feature”
test('Test Case 4', async ({ page }) => {
  await page.click('text=Mobile Application')
  await page.waitForSelector('text=Push notification system')
  await page.waitForSelector('text=To Do')
  await page.waitForSelector('text=Feature')
})

// Test Case 5
// Login to Demo App.
// Navigate to "Mobile Application."
// Verify "Offline mode" is in the "In Progress" column.
// Confirm tags: "Feature" & "High Priority”
test('Test Case 5', async ({ page }) => {
  await page.click('text=Mobile Application')
  await page.waitForSelector('text=Offline mode')
  await page.waitForSelector('text=In Progress')
  await page.waitForSelector('text=Feature')
  await page.waitForSelector('text=High Priority')
})

// Test Case 6
// Login to Demo App.
// Navigate to "Mobile Application."
// Verify "App icon design" is in the "Done" column.
// Confirm tags: "Design”
test('Test Case 6', async ({ page }) => {
  await page.click('text=Mobile Application')
  await page.waitForSelector('text=App icon design')
  await page.waitForSelector('text=Done')
  await page.waitForSelector('text=Design')
})
