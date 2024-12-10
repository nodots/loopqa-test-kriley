import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'
import { getSwimlanes } from './dom-helpers'
import { AsanaCredentials } from './types'
import { TestData } from './test-data'
import { _login } from './_login'
dotenv.config({ path: '../.env' })

const WebBoard = TestData.find((board) => board.title === 'Web Application')
if (!WebBoard) throw new Error('Web board not found')
const MobileBoard = TestData.find(
  (board) => board.title === 'Mobile Application'
)
if (!MobileBoard) throw new Error('Mobile board not found')

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

for (const board of TestData) {
  test(`Asana Board Tests - ${board.title}`, async ({ page }) => {
    const boardButton = page.locator('nav >> text=' + board.title).first()
    await boardButton.click()
    const swimlanes = await getSwimlanes(page)
    const expectedSwimlanes =
      board.title === 'Web Application'
        ? WebBoard.swimlanes
        : MobileBoard.swimlanes

    expect(swimlanes.length).toBe(expectedSwimlanes.length)
    for (let i = 0; i < swimlanes.length; i++) {
      const swimlane = swimlanes[i]
      const expectedSwimlane = expectedSwimlanes.find(
        (swimlane) => swimlane.order === i
      )
      if (!expectedSwimlane) throw new Error('Swimlane not found')
      expect(expectedSwimlane).toBeTruthy()
      expect(swimlane.kind).toBe(expectedSwimlane.kind)
      expect(swimlane.order).toBe(expectedSwimlane.order)
      expect(swimlane.stories.length).toBe(expectedSwimlane.stories.length)
      for (let j = 0; j < swimlane.stories.length; j++) {
        const story = swimlane.stories[j]
        const expectedStory = expectedSwimlane.stories[j]
        expect(story.title).toBe(expectedStory.title)
        expect(story.description).toBe(expectedStory.description)
        expect(story.tags).toEqual(expectedStory.tags)
      }
    }
  })
}
