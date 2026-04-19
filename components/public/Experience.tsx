export default function Experience() {
  const scenes = [
    { tag: "Business", title: "업계의 경계를 넘어서" },
    { tag: "Culture", title: "매달, 다른 공간에서" },
    { tag: "Healing", title: "가면을 내려놓는 자리" },
    { tag: "Network", title: "사람과 사람, 사업과 사업" },
  ];

  return (
    <section className="py-24 md:py-28 bg-ink-100">
      <div className="container-wide">
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Experience</p>
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
            우리가 만드는 장면들
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {scenes.map((s) => (
            <article
              key={s.title}
              className="bg-ink-50 border border-ink-200 p-6 hover:border-bronze-400 transition-colors"
            >
              <p className="eyebrow text-bronze-600 mb-3 text-[10px]">{s.tag}</p>
              <h3 className="font-serif text-base md:text-lg text-ink-900 leading-snug">
                {s.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
