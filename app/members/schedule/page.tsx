import MembersShell from "@/components/public/MembersShell";

const events = [
  {
    date: "2026.04.26",
    time: "19:00",
    title: "4월 테마 모임 · 감각의 회복",
    place: "성북동 한옥 다이닝",
    tag: "정기",
  },
  {
    date: "2026.05.10",
    time: "11:00",
    title: "업계 교차 브리핑 Vol.4",
    place: "강남 공유 라운지",
    tag: "스터디",
  },
  {
    date: "2026.06.14",
    time: "14:00",
    title: "블라인드 와인 테이스팅",
    place: "청담 와인 셀러",
    tag: "문화",
  },
  {
    date: "2026.07.20",
    time: "종일",
    title: "연례 엠티 · 기장",
    place: "부산 기장 숙소",
    tag: "특별",
  },
];

export default function SchedulePage() {
  return (
    <MembersShell
      eyebrow="Schedule"
      title="앞으로의 모임"
      description="확정된 일정과 함께, 이번 달의 안내를 모았습니다."
    >
      <div className="space-y-4 max-w-3xl">
        {events.map((e, i) => (
          <article
            key={i}
            className="bg-ink-900 border border-ink-800 hover:border-bronze-500 p-6 md:p-8 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex gap-6 md:gap-8 items-start">
                <div className="text-center shrink-0">
                  <p className="font-serif text-3xl text-bronze-300 leading-none">
                    {e.date.split(".")[2]}
                  </p>
                  <p className="text-xs text-ink-500 mt-1 tracking-wide">
                    {e.date.split(".")[0]}.{e.date.split(".")[1]}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-wide text-bronze-400 mb-1">
                    {e.tag.toUpperCase()}
                  </p>
                  <h3 className="font-serif text-xl text-ink-50 mb-2">
                    {e.title}
                  </h3>
                  <p className="text-xs text-ink-400">
                    {e.time} · {e.place}
                  </p>
                </div>
              </div>
              <button className="text-xs text-ink-500 hover:text-bronze-300 tracking-wide self-end md:self-start">
                참석 표시 →
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 bg-ink-900 border border-ink-800 p-8 max-w-3xl">
        <p className="eyebrow text-bronze-400 mb-3">Heads up</p>
        <h3 className="font-serif text-lg text-ink-50 mb-3">
          다음 달 주제 투표가 열려 있습니다
        </h3>
        <p className="text-ink-400 text-sm leading-relaxed mb-4">
          5월 모임의 방향을 함께 정합니다. 5월 1일 자정에 마감됩니다.
        </p>
        <button className="text-xs text-bronze-300 hover:text-bronze-200 tracking-wide">
          투표 참여 →
        </button>
      </div>
    </MembersShell>
  );
}
