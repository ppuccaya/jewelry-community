import MembersShell from "@/components/public/MembersShell";

const pins = [
  { date: "2025.03", name: "성북동 한옥 다이닝", top: "30%", left: "55%", note: "3월 테마 모임 · 10명 참석" },
  { date: "2025.02", name: "청담 와인 셀러", top: "55%", left: "40%", note: "블라인드 테이스팅 · 8명" },
  { date: "2024.11", name: "부산 기장 숙소", top: "68%", left: "72%", note: "연례 엠티 · 전원 참석" },
  { date: "2024.09", name: "연남동 소규모 전시", top: "40%", left: "28%", note: "전시 투어 · 협업 논의 시작" },
  { date: "2024.07", name: "서촌 비밀 바", top: "35%", left: "62%", note: "외부인 초대의 밤" },
  { date: "2024.05", name: "이태원 와인바", top: "52%", left: "66%", note: "멤버 생일 자리" },
];

export default function MembersMapPage() {
  return (
    <MembersShell
      eyebrow="Map Archive"
      title="우리의 지도, 더 자세히"
      description="멤버만 볼 수 있는, 모든 장소와 기록입니다. 핀마다 그날의 상세 정보가 연결될 예정입니다."
    >
      <div className="grid lg:grid-cols-3 gap-6 max-w-6xl">
        {/* 지도 */}
        <div className="lg:col-span-2">
          <div className="relative aspect-[4/3] bg-ink-900 border border-ink-800 overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(184,158,110,0.15) 39px, rgba(184,158,110,0.15) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(184,158,110,0.15) 39px, rgba(184,158,110,0.15) 40px)",
              }}
            />
            <div className="absolute top-4 left-4 text-[10px] text-ink-500 tracking-wide">
              PRIVATE MAP · {pins.length} LOCATIONS
            </div>

            {pins.map((p, i) => (
              <div
                key={i}
                style={{ top: p.top, left: p.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <span className="block w-3 h-3 rounded-full bg-bronze-500 ring-4 ring-bronze-500/20" />
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-500 mt-3 tracking-wide">
            * 실제 지도 연동은 추후 작업 예정입니다.
          </p>
        </div>

        {/* 장소 리스트 */}
        <div className="space-y-2">
          {pins.map((p, i) => (
            <div
              key={i}
              className="border-l-2 border-bronze-500 bg-ink-900 hover:bg-ink-800 transition-colors px-4 py-3"
            >
              <p className="text-[10px] text-bronze-400 tracking-wide mb-0.5">
                {p.date}
              </p>
              <p className="text-ink-100 text-sm font-medium mb-1">{p.name}</p>
              <p className="text-ink-500 text-xs">{p.note}</p>
            </div>
          ))}
        </div>
      </div>
    </MembersShell>
  );
}
