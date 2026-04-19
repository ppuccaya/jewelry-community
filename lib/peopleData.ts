export interface Person {
  id: string;
  initial: string;
  name: string;
  field: string;
  since: string;
  tone: string;
  oneLiner: string;
  tags?: string[];
  publicStory?: string;
}

export const people: Person[] = [];
