
export type EventType = 'shoot' | 'internal' | 'external'

export type RecentContent = {
  id: string;
  title: string;
  date: string;
  type: EventType;
}