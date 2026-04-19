export interface Person {
  id: string;
  initial: string;
  name: string;
  field: string;
  since: string;
  tone: string;
  oneLiner: string;
  tags?: string[];
  publicStory?: string; // 공개되는 짧은 이야기
}

export const people: Person[] = [
  {
    id: "h",
    initial: "H",
    name: "희",
    field: "주얼리 브랜드 운영 · 종로",
    since: "2024",
    tone: "from-ink-800 to-bronze-700",
    oneLiner: "격식의 원칙을 만든 사람",
    tags: ["모임장", "운영"],
    publicStory:
      "이 모임을 처음 시작한 사람. 2세로서 가업을 잇기 시작하며, 비슷한 자리에 있는 사람들과 격식을 지키며 성장할 수 있는 공간이 필요했다.",
  },
  {
    id: "s",
    initial: "S",
    name: "승규",
    field: "주얼리 제조",
    since: "2024",
    tone: "from-bronze-600 to-ink-800",
    oneLiner: "조용한 관찰자",
    tags: ["제조", "운영"],
    publicStory:
      "말보다 행동이 앞서는 타입. 모임의 어려운 자리마다 조용히 자리를 지킨다. 2024년 연간 MVP.",
  },
  {
    id: "j",
    initial: "J",
    name: "제갈",
    field: "리테일 · 편집숍",
    since: "2024",
    tone: "from-ink-700 to-ink-500",
    oneLiner: "깊이 있는 질문의 사람",
  },
  {
    id: "m",
    initial: "M",
    name: "민재",
    field: "다이아몬드 유통",
    since: "2024",
    tone: "from-bronze-400 to-bronze-700",
    oneLiner: "숫자로 말하는 로맨티스트",
  },
  {
    id: "y",
    initial: "Y",
    name: "유진",
    field: "세공 디자인",
    since: "2025",
    tone: "from-ink-400 to-ink-700",
    oneLiner: "손끝에 감각이 있는 사람",
  },
  {
    id: "k",
    initial: "K",
    name: "경수",
    field: "주얼리 컨설팅",
    since: "2025",
    tone: "from-ink-600 to-bronze-500",
    oneLiner: "다리를 놓는 사람",
  },
];
