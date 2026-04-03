export type MemberStatus = "active" | "inactive";

export interface Member {
  id: string;
  name: string;
  phone: string;
  joined_at: string;
  status: MemberStatus;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;        // ISO date string
  time?: string;       // "HH:MM"
  location?: string;
  notes?: string;
  created_at: string;
}

export interface EventAttendee {
  event_id: string;
  member_id: string;
  member?: Member;
}

export interface EventPhoto {
  id: string;
  event_id: string;
  storage_url: string;
  caption?: string;
  created_at: string;
}

export type IdeaTag = "친목" | "문화" | "여행" | "비즈니스" | "기타";
export type IdeaStatus = "아이디어" | "검토중" | "확정" | "완료";

export interface Idea {
  id: string;
  title: string;
  description?: string;
  tag: IdeaTag;
  status: IdeaStatus;
  reaction_count: number;
  created_at: string;
}

export interface Due {
  id: string;
  member_id: string;
  year: number;
  month: number;
  paid: boolean;
  member?: Member;
}

export interface EventCost {
  id: string;
  event_id: string;
  amount: number;
  description?: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message?: string;
  created_at: string;
}
