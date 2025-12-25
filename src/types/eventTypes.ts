
export type EventType = 'shoot' | 'internal' | 'external'

export type OverviewEvent = {
  id: string
  title: string
  date: string
  type: EventType
}

export type PastEvent = {
  id: string;
  title: string;
  date: string;
  type: EventType;
  path: string;
}
