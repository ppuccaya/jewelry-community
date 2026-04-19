import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";

const sections = [
  {
    num: "01",
    title: "사업가 브랜딩",
    items: [
      "사업가 기질 진단 (갤럽 강점, 성향 테스트)",
      "스피치 & 영업 스킬 스터디",
      "멤버 스토리 아카이브",
    ],
  },
  {
    num: "02",
    title: "비즈니스 인사이트",
    items: [
      "다른 업계 공간 탐방",
      "업계 교차 브리핑",
      "실패 케이스 스터디",
      "경제 · 투자 스터디 (외부 강사)",
      "AI 활용 스터디",
    ],
  },
  // 03. 삶의 성장 — 준비 중. 주석 해제 시 바로 노출.
  // {
  //   num: "03",
  //   title: "삶의 성장",
  //   items: [],
  // },
  {
    num: "04",
    title: "문화 경험",
    items: [
      "테마 공간 모임 (매월)",
      "블라인드 와인 테이스팅",
      "전시 · 팝업 투어",
      "모임 지도 아카이브",
    ],
  },
  {
    num: "05",
    title: "힐링 & 마음 경영",
    items: [
      "모임장의 집들이",
      "익명 고민 함",
      "심리상담 연계 서비스",
      "엠티 (연 1회)",
      "생일 챙기기",
      "연간 MVP 제도",
    ],
  },
  {
    num: "06",
    title: "네트워킹 & 확장",
    items: [
      "외부인 초대의 밤",
      "멘토 - 멘티 매칭",
      "멤버 크로스 콜라보",
      "협업 팝업",
    ],
  },
];

export default function ProgramPage() {
  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        <section className="py-16 text-center border-b border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-5">Program</p>
            <h1 className="font-serif text-4xl md:text-5xl text-ink-900 mb-6">
              프로그램
            </h1>
            <div className="divider mx-auto" />
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-narrow">
            <div className="space-y-14">
              {sections.map((s) => (
                <div key={s.num} className="grid md:grid-cols-12 gap-6 md:gap-10">
                  <div className="md:col-span-3">
                    <span className="block font-serif text-5xl text-bronze-300 leading-none mb-2">
                      {s.num}
                    </span>
                    <h2 className="font-serif text-xl text-ink-900">
                      {s.title}
                    </h2>
                  </div>
                  <ul className="md:col-span-9 space-y-2 border-l border-ink-200 pl-6">
                    {s.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-ink-700 text-[15px] leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
