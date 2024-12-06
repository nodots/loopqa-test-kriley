import { Page } from '@playwright/test'
import { AsanaSwimlaneTypes } from './constants'

/**
 * Retrieves the swimlanes from the given page. This is heavy on specific selectors ATM,
 * but, we need to infer relationships between tasks and swimlanes to ensure:
 *
 *   - Each test is preformed on the correct swimlane
 *   - That tests for the existence of things are carried out only on relevant portions
 *     of the DOM. E.g., we need to check for both for "Design" as a tag and
 *     "Design system updates" as a task title.
 *
 * Intentionally using more DOM-like selectors rather than Page.locator here to achieve
 * this. Purposefully returning the HTML content of the swimlanes to allow for more
 *
 * @param {Page} page - The Playwright page object to interact with.
 * @returns {Promise<any[]>} A promise that resolves to an array of swimlane HTML content.
 * @throws {Error} If the swimlanes are not found or incomplete.
 */
export async function getSwimlanes(page: Page): Promise<string[]> {
  let swimlanes: string[] = []
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
  if (swimlaneDivs?.length !== AsanaSwimlaneTypes.length) {
    throw new Error('Swimlanes not found or incomplete')
  }

  // Log the swimlanes for debugging
  for (const swimlane of swimlaneDivs) {
    const swinlaneHtml = await swimlane.innerHTML()
    getStory(swinlaneHtml, 'Design system updates')
    swimlanes.push(swinlaneHtml)
  }
  return swimlanes
}

function getStory(swimlane: string, title: string) {
  console.log(swimlane, title)
}
