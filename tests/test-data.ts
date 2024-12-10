import { AsanaSwimlane, ASANA_SWIMLANE_KIND, AsanaBoard } from '../types'

const webToDoSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.TODO,
  order: 1,
  stories: [
    {
      title: 'Implement user authentication',
      tags: ['Feature', 'High Priority'],
    },
    {
      title: 'Fix navigation bug',
      tags: ['Bug'],
    },
  ],
}

const webInProgressSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.IN_PROGRESS,
  order: 2,
  stories: [
    {
      title: 'Design system updates',
      tags: ['Design'],
    },
  ],
}

const webReviewSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.REVIEW,
  order: 3,
  stories: [],
}

const webDoneSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.DONE,
  order: 4,
  stories: [],
}

const mobileToDoSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.TODO,
  order: 1,
  stories: [
    {
      title: 'Push notification system',
      tags: ['Feature'],
    },
  ],
}

const mobileInProgressSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.IN_PROGRESS,
  order: 2,
  stories: [
    {
      title: 'Offline mode',
      tags: ['Feature', 'High Priority'],
    },
  ],
}

const mobileReviewSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.REVIEW,
  order: 3,
  stories: [],
}

const mobileDoneSwimlane: AsanaSwimlane = {
  kind: ASANA_SWIMLANE_KIND.DONE,
  order: 3,
  stories: [
    {
      title: 'App icon design',
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
