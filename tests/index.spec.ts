import { test, expect, Page } from '@playwright/test'

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

const ASANA_SWIMLANE_TYPES = ['To Do', 'In Progress', 'Review', 'Done']

/**
 * Retrieves the swimlanes from the given page. This is heavy on specific selectors ATM, but, we need to infer relationships between tasks and swimlanes
 * TODO: Refactor to be less dependent on specific selectors.
 * @param {Page} page - The Playwright page object to interact with.
 * @returns {Promise<any[]>} A promise that resolves to an array of swimlane HTML content.
 * @throws {Error} If the swimlanes are not found or incomplete.
 */
async function getSwimlanes(page: Page) {
  let swimlanes: any[] = []
  // Retrieve the main element
  const mainElement = await page.$('main')

  // Retrieve the div that contains the swimlanes
  const swimlanesContainer = await mainElement?.$('div > div')

  // Retrieve the swimlane divs
  // FIXME: Nasty selector
  const swimlaneDivs = await swimlanesContainer?.$$(
    'div.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4'
  )

  // Check if the swimlanes are retrieved correctly
  if (swimlaneDivs?.length !== ASANA_SWIMLANE_TYPES.length) {
    throw new Error('Swimlanes not found or incomplete')
  }

  // Log the swimlanes for debugging
  for (const swimlane of swimlaneDivs) {
    const textContent = await swimlane.innerHTML()
    swimlanes.push(textContent)
  }
  return swimlanes
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

  const swimlanes = await getSwimlanes(page)

  expect(swimlanes).toBeTruthy()
  expect(swimlanes?.length).toBeGreaterThan(0)
  expect(swimlanes?.length).toBe(4)
  const todoSwimlane = swimlanes[0]
  expect(todoSwimlane).toBeTruthy()
  expect(todoSwimlane).toContain('To Do')
  expect(todoSwimlane).toContain('Implement user authentication')
  expect(todoSwimlane).toContain('Feature')
  expect(todoSwimlane).toContain('High Priority')
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
