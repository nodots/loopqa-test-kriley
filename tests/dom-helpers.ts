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
 * Intentionally using more DOM-like selectors rather than Page.locator here to achieve
 * this. Purposefully returning the HTML content of the swimlanes to allow for more
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
    console.log('swimlane title:', kind)
    if (!title) throw new Error('Swimlane title not found')
    const storyDivs = await storyContainer.$$(
      'div.bg-white.p-4.rounded-lg.shadow-sm.border.border-gray-200.hover\\:shadow-md.transition-shadow'
    )
    for (const storyDiv of storyDivs) {
      // Retrieve the content of the h3 element (title)
      const title = await storyDiv.$eval(
        'h3.font-medium.text-gray-900.mb-2',
        (element) => element.textContent
      )
      console.log('Title:', title)

      // Retrieve the content of the p element (description)
      const description = await storyDiv.$eval(
        'p.text-sm.text-gray-600.mb-3',
        (element) => element.textContent
      )
      console.log('Description:', description)

      const tags = (
        await storyDiv.$$eval(
          'div.flex.flex-wrap.gap-2.mb-3 span',
          (elements) => elements.map((element) => element.textContent)
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

/*
                <div class="flex flex-col gap-3">
                  <div
                    class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <h3 class="font-medium text-gray-900 mb-2">Implement user authentication</h3>
                    <p class="text-sm text-gray-600 mb-3">Add login and signup functionality</p>
                    <div class="flex flex-wrap gap-2 mb-3"><span
                        class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Feature</span><span
                        class="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">High
                        Priority</span></div>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                      <div class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14"
                          height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user ">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg><span>Sarah Chen</span></div>
                      <div class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14"
                          height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar ">
                          <path d="M8 2v4"></path>
                          <path d="M16 2v4"></path>
                          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                          <path d="M3 10h18"></path>
                        </svg><span>3/24/2024</span></div>
                    </div>
                  </div>
                  <div
                    class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <h3 class="font-medium text-gray-900 mb-2">Fix navigation bug</h3>
                    <p class="text-sm text-gray-600 mb-3">Menu does not close on mobile</p>
                    <div class="flex flex-wrap gap-2 mb-3"><span
                        class="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Bug</span></div>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                      <div class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14"
                          height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user ">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg><span>John Smith</span></div>
                      <div class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14"
                          height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar ">
                          <path d="M8 2v4"></path>
                          <path d="M16 2v4"></path>
                          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                          <path d="M3 10h18"></path>
                        </svg><span>3/19/2024</span></div>
                    </div>
                  </div>
                </div>
*/
