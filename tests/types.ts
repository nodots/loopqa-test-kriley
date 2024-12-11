export interface AsanaCredentials {
  baseUrl: string
  username: string
  password: string
}

export enum ASANA_SWIMLANE_KIND {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  REVIEW = 'Review',
  DONE = 'Done',
}

// Only including the fields we need for now
export interface AsanaStory {
  title: string
  description: string
  tags: string[]
}

export interface AsanaSwimlane {
  kind: ASANA_SWIMLANE_KIND
  order: number
  stories: AsanaStory[]
}

export type AsanaSwimlanes = AsanaSwimlane[]

export interface AsanaBoard {
  title: string
  swimlanes: AsanaSwimlanes
}
