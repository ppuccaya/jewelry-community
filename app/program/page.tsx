import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import Link from "next/link";

const chapters = [
  {
    num: "I",
    eyebrow: "Self & Brand",
    title: "나를 알리기 전에, 나를 아는 일",
    intro:
      "사업가의 첫 번째 과제는 자기 자신이다. 내가 어떤 기질을 가졌고, 어떤 언어로 사람을 움직이며, 어떤 서사를 가진 사람인지. 이것을 분명히 할 때 브랜드는 자연스럽게 따라온다.",
    items: [
      {
        label: "사업가 기질 진단",
        note: "갤럽 강점 검사와 성향 테스트를 통해 나의 강점을 언어화합니다.",
      },
      {
        label: "스피치 & 영업 스터디",
        note: "말로 설득하는 힘, 숫자가 아닌 신뢰로 파는 기술을 함께 다듬습니다.",
      },
      {
        label: "멤버 스토리 아카이브",
        note: "각자의 시작과 전환점을 기록으로 남기고, 서로의 이야기로부터 배웁니다.",
      },
    ],
  },
  {
    num: "II",
    eyebrow: "Business Insight",
    title: "업계 안에만 있지 않기",
    intro:
      "우리 업계는 좁다. 그래서 밖을 자주 봐야 한다. 다른 업계의 논리, 다른 시장의 흐름, 다른 사람들의 실패를 보고 나면, 우리의 문제는 다르게 풀린다.",
    items: [
      {
        label: "다른 업계 공간 탐방",
        note: "우리 업계 밖의 공간을 직접 방문하고, 운영자의 이야기를 듣습니다.",
      },
      {
        label: "업계 교차 브리핑",
        note: "각자 몸담은 필드의 뉴스를 요약해 공유합니다. 짧지만 가장 밀도 높은 시간.",
      },
      {
        label: "실패 케이스 스터디",
        note: "잘된 이야기보다 잃은 이야기에서 더 많은 것을 배웁니다.",
      },
      {
        label: "경제 · 투자 스터디",
        note: "외부 강사를 정기적으로 초청해 거시적 흐름을 읽습니다.",
      },
      {
        label: "AI 활용 스터디",
        note: "도구를 단순 소비하지 않고, 실제 업무와 사업에 붙이는 법을 다룹니다.",
      },
    ],
  },
  // 3. 삶의 성장 카테고리는 준비 중. 배포 후 주석만 해제하면 바로 노출됨.
  // {
  //   num: "III",
  //   eyebrow: "Life Growth",
  //   title: "사업 바깥의 성장",
  //   intro: "준비 중입니다.",
  //   items: [],
  // },
  {
    num: "IV",
    eyebrow: "Culture & Taste",
    title: "감각이 자산이 되는 시간",
    intro:
      "사업가의 안목은 책상에서 만들어지지 않는다. 좋은 공간, 좋은 잔, 좋은 그림을 몸으로 겪은 만큼 우리의 판단은 정교해진다.",
    items: [
      {
        label: "테마 공간 모임",
        note: "매달 다른 테마에 맞춰 외부 공간을 대관해 모입니다.",
      },
      {
        label: "블라인드 와인 테이스팅",
        note: "편견 없이 잔을 드는 연습. 취향은 그렇게 길러집니다.",
      },
      {
        label: "전시 · 팝업 투어",
        note: "큐레이션된 전시와 팝업을 함께 돌며 감각을 나눕니다.",
      },
      {
        label: "모임 지도 아카이브",
        note: "우리가 다녀온 자리들은 지도가 되어 기록됩니다.",
      },
    ],
  },
  {
    num: "V",
    eyebrow: "Healing & Mind",
    title: "내려놓을 수 있는 자리",
    intro:
      "바깥에서는 단단해야 한다. 그러나 어딘가에서는 내려놓아야 한다. 이 모임 안에서만큼은 서로에게 기대는 것이 허용된다.",
    items: [
      {
        label: "모임장의 집들이",
        note: "격식을 잠시 내려놓는, 가장 사적인 자리.",
      },
      {
        label: "익명 고민 함",
        note: "모임 전 익명으로 고민을 남깁니다. 이름 없이 나누는 연대.",
      },
      {
        label: "심리상담 연계",
        note: "필요한 멤버에게 신뢰할 수 있는 전문가를 연결합니다.",
      },
      {
        label: "연 1회 엠티",
        note: "도시를 떠나 함께 한 해를 정리하고, 다음 해를 씁니다.",
      },
      {
        label: "생일 챙기기",
        note: "조용하지만 진심인 방식으로, 서로의 생일을 기억합니다.",
      },
      {
        label: "연간 MVP 제도",
        note: "한 해 동안 서로에게 가장 큰 영향을 준 멤버를 함께 선정합니다.",
      },
    ],
  },
  {
    num: "VI",
    eyebrow: "Networking & Expansion",
    title: "사람을 연결하고, 사업을 확장하는 일",
    intro:
      "좋은 관계는 좋은 사업으로 이어진다. 우리는 억지로 연결을 만들지 않는다. 다만 자연스러운 만남이 일어나도록 자리를 설계한다.",
    items: [
      {
        label: "외부인 초대의 밤",
        note: "멤버가 추천하는 외부 손님을 초대해, 네트워크의 원을 넓힙니다.",
      },
      {
        label: "멘토 - 멘티 매칭",
        note: "경력과 기질이 맞는 멤버끼리 1:1로 연결됩니다.",
      },
      {
        label: "멤버 크로스 콜라보",
        note: "여기서 시작된 협업을 모임이 함께 지원합니다.",
      },
      {
        label: "협업 팝업",
        note: "둘 이상의 멤버가 함께 만드는 팝업. 실제 시장에서 검증합니다.",
      },
    ],
  },
];

export default function ProgramPage() {
  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        {/* 헤더 */}
        <section className="py-20 md:py-28 text-center border-b border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-6">The Program</p>
            <h1 className="font-serif text-4xl md:text-6xl text-ink-900 leading-tight mb-8">
              이 모임에서 겪게 되는
              <br />
              여섯 장의 이야기
            </h1>
            <div className="divider mx-auto mb-8" />
            <p className="text-ink-600 leading-relaxed max-w-xl mx-auto">
              커리큘럼이 아닙니다. 한 해를 함께 살며
              자연스럽게 통과하게 되는 경험의 결입니다.
            </p>
          </div>
        </section>

        {/* 챕터들 */}
        <div className="container-wide py-16 md:py-24 space-y-24 md:space-y-32">
          {chapters.map((ch, idx) => (
            <section key={ch.num} className="relative">
              <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-4">
                  <div className="sticky top-24">
                    <span className="block font-serif text-7xl md:text-8xl text-bronze-300 leading-none mb-4">
                      {ch.num}
                    </span>
                    <p className="eyebrow mb-4">{ch.eyebrow}</p>
                    <h2 className="font-serif text-2xl md:text-3xl text-ink-900 leading-tight">
                      {ch.title}
                    </h2>
                  </div>
                </div>

                <div className="md:col-span-8">
                  <p className="text-ink-700 text-lg leading-relaxed mb-10 border-l-2 border-bronze-400 pl-6">
                    {ch.intro}
                  </p>

                  <div className="space-y-6">
                    {ch.items.map((item, i) => (
                      <div
                        key={i}
                        className="border-b border-ink-200 pb-6 last:border-b-0"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="text-xs text-ink-400 tracking-wide font-medium">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-serif text-lg text-ink-900 mb-2">
                              {item.label}
                            </h3>
                            <p className="text-ink-600 text-[15px] leading-relaxed">
                              {item.note}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {idx < chapters.length - 1 && (
                <div className="mt-16 md:mt-24 flex justify-center">
                  <div className="w-px h-16 bg-ink-300" />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* CTA */}
        <section className="bg-ink-900 text-ink-100 py-24 text-center">
          <div className="container-narrow">
            <p className="eyebrow text-bronze-400 mb-6">The Next Step</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
              이 결이 당신과 맞는다면
            </h2>
            <div className="w-12 h-px bg-bronze-400 mx-auto mb-8" />
            <p className="text-ink-300 leading-relaxed mb-10 max-w-lg mx-auto">
              조용히 신청서를 남겨주세요. 천천히 이야기 나눠보고 싶습니다.
            </p>
            <Link
              href="/apply"
              className="inline-block bg-bronze-500 hover:bg-bronze-600 text-ink-50 font-medium px-10 py-4 tracking-wide transition-colors"
            >
              참여 신청하기
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
