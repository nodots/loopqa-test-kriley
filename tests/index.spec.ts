import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'
import { AsanaSwimlaneTypes } from './constants'
import { getSwimlanes } from './dom-helpers'
import { TestData } from './test-data'
import { AsanaCredentials, AsanaStory, AsanaSwimlane } from './types'
dotenv.config({ path: '../.env' })

export const ASANA_CREDENTIALS: AsanaCredentials = {
  baseUrl:
    process.env.ASANA_BASE_URL ||
    'https://animated-gingersnap-8cf7f2.netlify.app',
  username: process.env.ASANA_USERNAME || 'admin',
  password: process.env.ASANA_PASSWORD || 'password123',
}

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

// Test Case 1
// 1  - Login to Demo App.
// 2  - Navigate to "Web Application."
// 3  - Verify "Implement user authentication" is in the "To Do" column.
// 4  - Confirm tags: "Feature" "High Priority”
test('Test Case 1', async ({ page }) => {
  await page.click('text=Web Application')
  const webAppTestData = TestData.web
  const todoSwimlaneData: AsanaSwimlane = webAppTestData.swimlanes.find(
    (l) => l.type === 'To Do'
  ) as AsanaSwimlane

  const swimlanes = await getSwimlanes(page)

  const testStory = todoSwimlaneData.stories.find(
    (s) => s.title === 'Implement user authentication'
  ) as AsanaStory

  expect(swimlanes).toBeTruthy()
  expect(swimlanes?.length).toBeGreaterThan(0)
  expect(swimlanes?.length).toBe(AsanaSwimlaneTypes.length)
  const todoSwimlane = swimlanes[0]
  expect(todoSwimlane).toBeTruthy()
  expect(todoSwimlane).toContain(todoSwimlaneData.type)
  expect(todoSwimlane).toContain(testStory.title)
  testStory.tags.forEach((tag) => {
    expect(todoSwimlane).toContain(tag)
  })
})

// Test Case 2
// Login to Demo App.
// Navigate to "Web Application."
// Verify "Fix navigation bug" is in the "To Do" column.
// Confirm tags: "Bug"
test('Test Case 2', async ({ page }) => {
  await page.click('text=Web Application')
  const swimlanes = await getSwimlanes(page)
  const todoSwimlane = swimlanes[0]
  expect(todoSwimlane).toBeTruthy()
  expect(todoSwimlane).toContain('To Do')
  expect(todoSwimlane).toContain('Fix navigation bug')
  expect(todoSwimlane).toContain('Bug')
})

// Test Case 3
// Login to Demo App.
// Navigate to "Web Application."
// Verify "Design system updates" is in the "In Progress" column.
// Confirm tags: "Design”

test('Test Case 3', async ({ page }) => {
  await page.click('text=Web Application')
  const swimlanes = await getSwimlanes(page)
  const inProgressSwimlane = swimlanes[1]
  expect(inProgressSwimlane).toBeTruthy()
  expect(inProgressSwimlane).toContain('In Progress')
  expect(inProgressSwimlane).toContain('Design system updates')
  expect(inProgressSwimlane).toContain('Design')
})

// Test Case 4
// Login to Demo App.
// Navigate to "Mobile Application."
// Verify "Push notification system" is in the "To Do" column.
// Confirm tags: "Feature”
test('Test Case 4', async ({ page }) => {
  await page.click('text=Mobile Application')
  const swimlanes = await getSwimlanes(page)
  const todoSwimlane = swimlanes[0]
  expect(todoSwimlane).toBeTruthy()
  expect(todoSwimlane).toContain('To Do')
  expect(todoSwimlane).toContain('Push notification system')
  expect(todoSwimlane).toContain('Feature')
})

// Test Case 5
// Login to Demo App.
// Navigate to "Mobile Application."
// Verify "Offline mode" is in the "In Progress" column.
// Confirm tags: "Feature" & "High Priority”
test('Test Case 5', async ({ page }) => {
  await page.click('text=Mobile Application')
  const swimlanes = await getSwimlanes(page)
  const inProgressSwimlane = swimlanes[1]
  expect(inProgressSwimlane).toBeTruthy()
  expect(inProgressSwimlane).toContain('In Progress')
  expect(inProgressSwimlane).toContain('Offline mode')
  expect(inProgressSwimlane).toContain('Feature')
  expect(inProgressSwimlane).toContain('High Priority')
})

// Test Case 6
// Login to Demo App.
// Navigate to "Mobile Application."
// Verify "App icon design" is in the "Done" column.
// Confirm tags: "Design”
test('Test Case 6', async ({ page }) => {
  await page.click('text=Mobile Application')
  const swimlanes = await getSwimlanes(page)
  const doneSwimlane = swimlanes[3]
  expect(doneSwimlane).toBeTruthy()
  expect(doneSwimlane).toContain('Done')
  expect(doneSwimlane).toContain('App icon design')
  expect(doneSwimlane).toContain('Design')
})
