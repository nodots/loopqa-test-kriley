import {
  ASANA_SWIMLANE_KIND,
  AsanaBoard,
  AsanaStory,
  AsanaSwimlane,
} from './types'

export type AsanaStoryTestData = AsanaStory & { included: boolean }
export type AsanaSwimlaneTestData = Omit<AsanaSwimlane, 'stories'> & {
  stories: AsanaStoryTestData[]
}
export type AsanaBoardTestData = Omit<AsanaBoard, 'swimlanes'> & {
  swimlanes: AsanaSwimlaneTestData[]
}

const webToDoSwimlane: AsanaSwimlaneTestData = {
  kind: ASANA_SWIMLANE_KIND.TODO,
  order: 0,
  stories: [
    {
      title: 'Implement user authentication',
      description: 'Add login and signup functionality',
      tags: ['Feature', 'High Priority'],
      included: true,
    },
    {
      title: 'Fix navigation bug',
      description: 'Menu does not close on mobile',
      tags: ['Bug'],
      included: true,
    },
  ],
}

const webInProgressSwimlane: AsanaSwimlaneTestData = {
  kind: ASANA_SWIMLANE_KIND.IN_PROGRESS,
  order: 1,
  stories: [
    {
      title: 'Design system updates',
      description: 'Update color palette and typography',
      tags: ['Design'],
      included: true,
    },
  ],
}

const webReviewSwimlane: AsanaSwimlaneTestData = {
  kind: ASANA_SWIMLANE_KIND.REVIEW,
  order: 2,
  stories: [
    {
      title: 'API integration',
      description: 'Connect to payment gateway',
      tags: ['Feature', 'High Priority'],
      included: false,
    },
  ],
}

const webDoneSwimlane: AsanaSwimlaneTestData = {
  kind: ASANA_SWIMLANE_KIND.DONE,
  order: 3,
  stories: [
    {
      title: 'Update documentation',
      description: 'Add API endpoints documentation',
      tags: ['Feature'],
      included: false,
    },
  ],
}

const mobileToDoSwimlane: AsanaSwimlaneTestData = {
  kind: ASANA_SWIMLANE_KIND.TODO,
  order: 0,
  stories: [
    {
      title: 'Push notification system',
      description: 'Implement push notifications for iOS and Android',
      tags: ['Feature'],
      included: true,
    },
  ],
}

const mobileInProgressSwimlane: AsanaSwimlaneTestData = {
  kind: ASANA_SWIMLANE_KIND.IN_PROGRESS,
  order: 1,
  stories: [
    {
      title: 'Offline mode',
      description: 'Enable offline data synchronization',
      tags: ['Feature', 'High Priority'],
      included: true,
    },
  ],
}

const mobileReviewSwimlane: AsanaSwimlaneTestData = {
  kind: ASANA_SWIMLANE_KIND.REVIEW,
  order: 2,
  stories: [],
}

const mobileDoneSwimlane: AsanaSwimlaneTestData = {
  kind: ASANA_SWIMLANE_KIND.DONE,
  order: 3,
  stories: [
    {
      title: 'App icon design',
      description: 'Create app icons for all required sizes',
      tags: ['Design'],
      included: true,
    },
  ],
}

export const TestData: AsanaBoardTestData[] = [
  {
    title: 'Web Application',
    swimlanes: [
      webToDoSwimlane,
      webInProgressSwimlane,
      webReviewSwimlane,
      webDoneSwimlane,
    ],
  },
  {
    title: 'Mobile Application',
    swimlanes: [
      mobileToDoSwimlane,
      mobileInProgressSwimlane,
      mobileReviewSwimlane,
      mobileDoneSwimlane,
    ],
  },
]
