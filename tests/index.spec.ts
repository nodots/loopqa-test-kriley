import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'
import { _login } from './login'
import { getSwimlanes } from './dom-helpers'
import {
  AsanaBoardTestData,
  AsanaSwimlaneTestData,
  TestData,
} from './test-data'
import { AsanaCredentials } from './types'
dotenv.config({ path: '../.env' })

const tests = TestData as AsanaBoardTestData[]

const WebBoard = tests.find((board) => board.title === 'Web Application')
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
  test.describe(`Asana Board Tests - ${board.title}`, () => {
    test.beforeEach(async ({ page }) => {
      const boardButton = page.locator(`nav >> text=${board.title}`).first()
      await boardButton.click()
    })

    for (const swimlane of board.swimlanes as AsanaSwimlaneTestData[]) {
      test.describe(`Swimlane - ${swimlane.kind}`, () => {
        for (const story of swimlane.stories) {
          story.included &&
            test(`Story - ${story.title}`, async ({ page }) => {
              const swimlanes = await getSwimlanes(page)
              const expectedSwimlanes =
                board.title === 'Web Application'
                  ? WebBoard.swimlanes
                  : board.title === 'Mobile Application'
                  ? MobileBoard.swimlanes
                  : []

              const expectedSwimlane = expectedSwimlanes.find(
                (s) => s.kind === swimlane.kind
              )
              // Note: We are throwing here because if any of these things fail it means the test setup itself is broken.
              // Better implementation would be chaining promises and handling errors at the tail end of the chain.
              if (!expectedSwimlane) throw new Error('Swimlane not found')

              const actualSwimlane = swimlanes.find(
                (s) => s.kind === swimlane.kind
              )
              if (!actualSwimlane) throw new Error('Actual swimlane not found')

              const expectedStory = expectedSwimlane.stories.find(
                (s) => s.title === story.title
              )
              if (!expectedStory) throw new Error('Expected story not found')

              const actualStory = actualSwimlane.stories.find(
                (s) => s.title === story.title
              )
              if (!actualStory) throw new Error('Actual story not found')

              expect(actualStory.title).toBe(expectedStory.title)
              expect(actualStory.description).toBe(expectedStory.description)
              expect(actualStory.tags).toEqual(expectedStory.tags)
            })
        }
      })
    }
  })
}
