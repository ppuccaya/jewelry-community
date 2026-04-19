import MembersShell from "@/components/public/MembersShell";

const records = [
  {
    date: "2026.03.22",
    title: "3월 테마 모임 · 봄의 여유",
    place: "성북동 한옥",
    photos: 14,
    summary:
      "봄비와 함께 시작된 저녁. 한 멤버의 승진을 조용히 축하한 자리. 업계를 떠나서 이야기하는 시간이 유난히 길었다.",
  },
  {
    date: "2026.02.18",
    title: "블라인드 와인 테이스팅 Vol.3",
    place: "청담 와인 셀러",
    photos: 22,
    summary:
      "올해 처음으로 6명 전원이 같은 와인을 1등으로 뽑은 밤. 맛이 아닌 직감의 영역을 나눴다.",
  },
  {
    date: "2026.01.12",
    title: "새해의 첫 모임 · 다짐의 밤",
    place: "모임장 자택",
    photos: 9,
    summary:
      "각자 올해 쓰고 싶은 한 단어를 적어 나눴다. 격식과 편안함의 경계에서 오래 이야기했다.",
  },
];

export default function RecordsPage() {
  return (
    <MembersShell
      eyebrow="Records"
      title="지난 모임의 기록"
      description="함께 쌓은 장면을 되돌아봅니다. 사진과 기록은 이 공간에서만 볼 수 있습니다."
    >
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
        {records.map((r, i) => (
          <article
            key={i}
            className="group bg-ink-900 border border-ink-800 hover:border-bronze-500 overflow-hidden transition-colors"
          >
            {/* 썸네일 placeholder */}
            <div className="aspect-[16/10] bg-gradient-to-br from-ink-800 to-ink-900 relative flex items-center justify-center">
              <span className="text-6xl font-serif text-ink-700">
                {r.date.split(".")[2]}
              </span>
              <span className="absolute bottom-3 right-3 text-[10px] text-ink-500 tracking-wide">
                {r.photos} PHOTOS
              </span>
            </div>
            <div className="p-6">
              <p className="text-xs text-ink-500 tracking-wide mb-2">
                {r.date} · {r.place}
              </p>
              <h3 className="font-serif text-xl text-ink-50 mb-3">{r.title}</h3>
              <p className="text-ink-400 text-sm leading-relaxed line-clamp-3">
                {r.summary}
              </p>
              <div className="mt-5 text-xs text-ink-500 group-hover:text-bronze-300 tracking-wide">
                자세히 보기 →
              </div>
            </div>
          </article>
        ))}
      </div>
    </MembersShell>
  );
}
