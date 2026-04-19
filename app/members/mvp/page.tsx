import MembersShell from "@/components/public/MembersShell";

const history = [
  {
    year: "2025",
    name: "제갈",
    reason:
      "한 해 동안 가장 많은 질문을 던져 모임의 깊이를 만들어준 사람.",
    status: "선정 완료",
  },
  {
    year: "2024",
    name: "승규",
    reason:
      "처음 모임의 기틀을 함께 잡은 사람. 어려운 자리마다 조용히 자리를 지켰다.",
    status: "선정 완료",
  },
];

const candidates = [
  { name: "희", votes: 3, note: "모임의 원칙을 지키는 사람" },
  { name: "민재", votes: 2, note: "새로운 협업의 시작점" },
  { name: "유진", votes: 2, note: "감각을 나눠주는 사람" },
  { name: "경수", votes: 1, note: "다리를 놓는 사람" },
];

export default function MvpPage() {
  return (
    <MembersShell
      eyebrow="Annual MVP"
      title="한 해 동안 서로에게"
      description="한 해 동안 서로에게 가장 큰 영향을 준 멤버를 함께 선정합니다. 숫자보다 이야기로 뽑습니다."
    >
      {/* 올해의 후보 */}
      <section className="mb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="eyebrow text-bronze-400 mb-2">This Year · 2026</p>
            <h2 className="font-serif text-2xl text-ink-50">
              올해의 후보
            </h2>
          </div>
          <p className="text-xs text-ink-500 tracking-wide">
            12월 31일 자정 마감
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
          {candidates.map((c, i) => (
            <article
              key={i}
              className="bg-ink-900 border border-ink-800 p-6 hover:border-bronze-500 transition-colors"
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-serif text-2xl text-ink-50">{c.name}</h3>
                <span className="text-xs text-bronze-400 tracking-wide">
                  {c.votes} 추천
                </span>
              </div>
              <p className="text-ink-400 text-sm leading-relaxed italic mb-5">
                &ldquo;{c.note}&rdquo;
              </p>
              <button className="w-full border border-ink-700 hover:border-bronze-500 hover:text-bronze-300 text-ink-400 text-xs py-2 tracking-wide transition-colors">
                추천 남기기
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* 역대 MVP */}
      <section className="max-w-3xl">
        <p className="eyebrow text-bronze-400 mb-2">Hall of Quiet Honor</p>
        <h2 className="font-serif text-2xl text-ink-50 mb-6">역대 MVP</h2>
        <div className="space-y-5">
          {history.map((h, i) => (
            <article
              key={i}
              className="bg-ink-900 border border-ink-800 p-6 flex items-start gap-6"
            >
              <div className="font-serif text-4xl text-bronze-300 leading-none shrink-0">
                {h.year}
              </div>
              <div className="flex-1 border-l border-ink-700 pl-6">
                <h3 className="font-serif text-xl text-ink-50 mb-2">
                  {h.name}
                </h3>
                <p className="text-ink-400 text-sm leading-relaxed">
                  {h.reason}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </MembersShell>
  );
}
