export type MetaEventType = 'reply' | 'modeChange';
export type TagModeEventType = 'tagsEnter' | 'tagsExit' | 'tags';
export interface Event {
  id?: string
  success: boolean
  event: TagModeEventType | MetaEventType
  data: any
}
