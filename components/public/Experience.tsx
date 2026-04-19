export default function Experience() {
  const scenes = [
    {
      tag: "Business Insight",
      title: "업계의 경계를 넘어서",
      body: "주얼리 밖의 세계를 본다. 다른 업계 사람들과 만나고, 그들의 공간에 들어가고, 다른 논리를 배운다. 시야가 넓어질 때 사업은 달라진다.",
    },
    {
      tag: "Space & Taste",
      title: "매달, 다른 공간에서",
      body: "매달 테마가 다른 공간을 대관한다. 와인 테이스팅, 전시 투어, 팝업 방문. 함께 쌓는 감각과 기억은 어디서도 살 수 없다.",
    },
    {
      tag: "Honest Talk",
      title: "가면을 내려놓는 자리",
      body: "모임 전, 익명으로 고민을 남긴다. 모두가 가진 불안과 막막함을 조용히 나눈다. 비즈니스는 강하게, 사람은 솔직하게.",
    },
    {
      tag: "Cross Collaboration",
      title: "사람과 사람, 사업과 사업",
      body: "여기서 시작된 협업이 팝업이 되고, 사업이 된다. 우리가 연결되면, 새로운 것이 만들어진다.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-ink-100">
      <div className="container-wide">
        <div className="text-center mb-20">
          <p className="eyebrow mb-6">What You Experience</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink-900 leading-tight mb-6">
            우리가 만드는 장면들
          </h2>
          <div className="divider mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {scenes.map((s) => (
            <article
              key={s.title}
              className="bg-ink-50 border border-ink-200 p-8 md:p-10 hover:border-bronze-400 transition-colors group"
            >
              <p className="eyebrow text-bronze-600 mb-4">{s.tag}</p>
              <h3 className="font-serif text-xl md:text-2xl text-ink-900 mb-4 leading-tight">
                {s.title}
              </h3>
              <p className="text-ink-600 leading-relaxed text-[15px]">
                {s.body}
              </p>
              <div className="mt-6 w-8 h-px bg-bronze-300 group-hover:w-16 transition-all" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
