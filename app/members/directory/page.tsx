import MembersShell from "@/components/public/MembersShell";

const members = [
  { initial: "H", name: "희 · 모임장", field: "주얼리 브랜드 운영", since: "2024", note: "격식의 원칙을 만든 사람" },
  { initial: "S", name: "승규", field: "주얼리 제조", since: "2024", note: "조용한 관찰자" },
  { initial: "J", name: "제갈", field: "리테일", since: "2024", note: "깊이 있는 질문의 사람" },
  { initial: "M", name: "민재", field: "다이아몬드 유통", since: "2024", note: "숫자로 말하는 로맨티스트" },
  { initial: "Y", name: "유진", field: "세공 디자인", since: "2025", note: "손끝에 감각이 있는 사람" },
  { initial: "K", name: "경수", field: "주얼리 컨설팅", since: "2025", note: "다리를 놓는 사람" },
];

export default function DirectoryPage() {
  return (
    <MembersShell
      eyebrow="Directory"
      title="함께하는 사람들"
      description="격식을 지키며 서로를 알아가는, 이 모임의 얼굴들입니다."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
        {members.map((m, i) => (
          <article
            key={i}
            className="bg-ink-900 border border-ink-800 p-6 hover:border-bronze-500 transition-colors"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-ink-800 border border-bronze-500/30 flex items-center justify-center font-serif text-2xl text-bronze-300 shrink-0">
                {m.initial}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg text-ink-50 truncate">
                  {m.name}
                </h3>
                <p className="text-xs text-ink-500 mt-0.5">{m.field}</p>
              </div>
            </div>
            <div className="w-6 h-px bg-bronze-400 mb-4" />
            <p className="text-ink-400 text-sm leading-relaxed italic">
              &ldquo;{m.note}&rdquo;
            </p>
            <p className="text-[10px] text-ink-600 mt-4 tracking-wide">
              SINCE {m.since}
            </p>
          </article>
        ))}
      </div>
    </MembersShell>
  );
}
