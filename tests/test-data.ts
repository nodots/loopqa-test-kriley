import { AsanaSwimlane, ASANA_SWIMLANE_KIND, AsanaBoard } from '../types'

const webToDoSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.TODO,
  order: 0,
  stories: [
    {
      title: 'Implement user authentication',
      description: 'Add login and signup functionality',
      tags: ['Feature', 'High Priority'],
    },
    {
      title: 'Fix navigation bug',
      description: 'Menu does not close on mobile',
      tags: ['Bug'],
    },
  ],
}

const webInProgressSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.IN_PROGRESS,
  order: 1,
  stories: [
    {
      title: 'Design system updates',
      description: 'Update color palette and typography',
      tags: ['Design'],
    },
  ],
}

const webReviewSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.REVIEW,
  order: 2,
  stories: [
    {
      title: 'API integration',
      description: 'Connect to payment gateway',
      tags: ['Feature', 'High Priority'],
    },
  ],
}

const webDoneSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.DONE,
  order: 3,
  stories: [
    {
      title: 'Update documentation',
      description: 'Add API endpoints documentation',
      tags: ['Feature'],
    },
  ],
}

const mobileToDoSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.TODO,
  order: 0,
  stories: [
    {
      title: 'Push notification system',
      description: 'Implement push notifications for iOS and Android',
      tags: ['Feature'],
    },
  ],
}

const mobileInProgressSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.IN_PROGRESS,
  order: 1,
  stories: [
    {
      title: 'Offline mode',
      description: 'Enable offline data synchronization',
      tags: ['Feature', 'High Priority'],
    },
  ],
}

const mobileReviewSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.REVIEW,
  order: 2,
  stories: [],
}

const mobileDoneSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.DONE,
  order: 3,
  stories: [
    {
      title: 'App icon design',
      description: 'Create app icons for all required sizes',
      tags: ['Design'],
    },
  ],
}

export const TestData: AsanaBoard[] = [
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
