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
  order: number
  kind: ASANA_SWIMLANE_KIND
  stories: AsanaStory[]
}

// Consider more specific type to limit to 4 swimlanes
export type AsanaSwimlanes = AsanaSwimlane[]

export interface AsanaBoard {
  title: string
  swimlanes: AsanaSwimlanes
}
