export interface AsanaCredentials {
  baseUrl: string
  username: string
  password: string
}

export enum ASANA_SWIMLANE_TYPE {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  REVIEW = 'Review',
  DONE = 'Done',
}

// Only including the fields we need for now
export interface AsanaStory {
  title: string
  tags: string[]
}

export interface AsanaSwimlane {
  type: ASANA_SWIMLANE_TYPE
  stories: AsanaStory[]
}

export type AsanaSwimlanes = [
  AsanaSwimlane,
  AsanaSwimlane,
  AsanaSwimlane,
  AsanaSwimlane
]

export interface AsanaBoard {
  title: string
  swimlanes: AsanaSwimlanes
}
