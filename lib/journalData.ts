// 모임 일지. 어드민에서 입력할 수 있도록 추후 연동 예정.

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  place: string;
  tag: string;
  coverTone: string;
  teaser: string;
  body?: string[];
  isPublic: boolean;
}

export const journalEntries: JournalEntry[] = [];
