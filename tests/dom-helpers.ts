import { Page } from '@playwright/test'
import { AsanaStory, AsanaSwimlane } from '../types'
import { ASANA_SWIMLANE_KIND } from './types'

/**
 * Retrieves the swimlanes from the given page. This is heavy on specific selectors ATM,
 * but, we need to infer relationships between tasks and swimlanes to ensure:
 *
 *   - Each test is preformed on the correct swimlane
 *   - That tests for the existence of things are carried out only on relevant portions
 *     of the DOM. E.g., we need to check for both for "Design" as a tag and
 *     "Design system updates" as a task title.
 *
 * @param {Page} page - The Playwright page object to interact with.
 * @returns {Promise<any[]>} A promise that resolves to an array of swimlane HTML content.
 * @throws {Error} If the swimlanes are not found or incomplete.
 */

export async function getSwimlanes(page: Page): Promise<AsanaSwimlane[]> {
  const swimlanes: AsanaSwimlane[] = []
  const swimlaneTitlesLocator = page.locator('main div div h2')
  const swimlanesLocator = swimlaneTitlesLocator.locator('..')

  const swimlaneElements = await swimlanesLocator.elementHandles()

  if (!swimlaneElements) throw new Error('Swimlanes not found')

  for (let i = 0; i < swimlaneElements.length; i++) {
    const stories: AsanaStory[] = []
    const swimlaneElement = swimlaneElements[i]
    const titleHandle = await swimlaneElement.$('h2')
    if (!titleHandle) throw new Error('Swimlane title not found')
    const title = await titleHandle.innerText()
    const storyContainer = await titleHandle.$(
      'xpath=following-sibling::div[1]'
    )
    if (!storyContainer) throw new Error('Story container not found')
    const kind = title.replace(/\s*\(\d+\)$/, '') as ASANA_SWIMLANE_KIND
    if (!title) throw new Error('Swimlane title not found')
    const storyDivs = await storyContainer.$$('div.bg-white.p-4') // FIXME: Bad selector
    for (const storyDiv of storyDivs) {
      // Retrieve the content of the h3 element (title)
      const title = await storyDiv.$eval('h3', (element) => element.textContent)

      // Retrieve the content of the p element (description)
      const description = await storyDiv.$eval(
        'p',
        (element) => element.textContent
      )

      const tags = (
        await storyDiv.$$eval(
          'div.flex.flex-wrap.gap-2 span',
          (
            elements // FIXME: Bad selector
          ) => elements.map((element) => element.textContent)
        )
      ).filter((tag): tag is string => tag !== null)

      if (!title || !description || !tags || tags.length === 0)
        throw new Error('Story content not found')

      const story: AsanaStory = {
        title: title,
        description: description,
        tags,
      }

      stories.push(story)
    }
    const swimlane: AsanaSwimlane = {
      order: i,
      kind: kind,
      stories: stories,
    }

    swimlanes.push(swimlane)
  }

  return swimlanes
}
