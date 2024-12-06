import {
  AsanaStory,
  AsanaSwimlanes,
  ASANA_SWIMLANE_TYPE,
  AsanaBoard,
} from './types'

// Start "Web Application Board" definitions

// To Do Swimlane
const implementUserAuthentication: AsanaStory = {
  title: 'Implement user authentication',
  tags: ['Feature', 'High Priority'],
}

const fixNavigationBug: AsanaStory = {
  title: 'Fix navigation bug',
  tags: ['Bug'],
}

const webAppToDoStories: AsanaStory[] = [
  implementUserAuthentication,
  fixNavigationBug,
]

// In Progress Swimlane
const designSystemUpdates: AsanaStory = {
  title: 'Design system updates',
  tags: ['Design'],
}

const webAppInProgressStories: AsanaStory[] = [designSystemUpdates]

// Review Swimlane
const apiIntegration: AsanaStory = {
  title: 'API integration',
  tags: ['Feature', 'High Priority'],
}

const webAppReviewStories: AsanaStory[] = [apiIntegration]

// Done Swimlane
const updateDocumenation: AsanaStory = {
  title: 'Update documentation',
  tags: ['Feature'],
}
const webAppDoneStories: AsanaStory[] = [updateDocumenation]

const webApplicationSwimlanes: AsanaSwimlanes = [
  { type: ASANA_SWIMLANE_TYPE.TODO, stories: webAppToDoStories },
  { type: ASANA_SWIMLANE_TYPE.IN_PROGRESS, stories: webAppInProgressStories },
  { type: ASANA_SWIMLANE_TYPE.REVIEW, stories: webAppReviewStories },
  { type: ASANA_SWIMLANE_TYPE.DONE, stories: webAppDoneStories },
]

const webApplicationBoard: AsanaBoard = {
  title: 'Web Application',
  swimlanes: webApplicationSwimlanes,
}

// End "Web Application Board" definitions

// Start "Mobile Application Board" definitions

// To Do Swimlane
const pushNotificationSystem: AsanaStory = {
  title: 'Push notification system',
  tags: ['Feature'],
}

const mobileAppToDoStories: AsanaStory[] = [pushNotificationSystem]

// In Progress Swimlane
const offlineMode: AsanaStory = {
  title: 'Offline mode',
  tags: ['Feature', 'High Priority'],
}

const mobileAppInProgressStories: AsanaStory[] = [offlineMode]

// Review Swimlane
// No stories in this swimlane

// Done Swimlane
const appIconDesign: AsanaStory = {
  title: 'App icon design',
  tags: ['Design'],
}

const mobileAppDoneStories: AsanaStory[] = [appIconDesign]

const mobileApplicationSwimlanes: AsanaSwimlanes = [
  { type: ASANA_SWIMLANE_TYPE.TODO, stories: mobileAppToDoStories },
  {
    type: ASANA_SWIMLANE_TYPE.IN_PROGRESS,
    stories: mobileAppInProgressStories,
  },
  { type: ASANA_SWIMLANE_TYPE.REVIEW, stories: [] },
  { type: ASANA_SWIMLANE_TYPE.DONE, stories: mobileAppDoneStories },
]

const mobileAppBoard: AsanaBoard = {
  title: 'Mobile Application',
  swimlanes: mobileApplicationSwimlanes,
}

export const TestData = { web: webApplicationBoard, mobile: mobileAppBoard }
