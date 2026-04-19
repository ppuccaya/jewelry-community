import Link from "next/link";
import { people } from "@/lib/peopleData";

export default function PeoplePreview() {
  const preview = people.slice(0, 6);

  return (
    <section className="py-24 md:py-32 bg-ink-900 text-ink-100">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <p className="eyebrow text-bronze-400 mb-4">People</p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink-50 leading-tight">
              이 자리의 얼굴들
            </h2>
          </div>
          <Link
            href="/people"
            className="hidden md:inline-block text-sm text-ink-400 hover:text-ink-50 border-b border-ink-700 hover:border-bronze-400 pb-1"
          >
            모두 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {preview.map((p) => (
            <Link
              key={p.id}
              href="/people"
              className="group"
            >
              <div
                className={`aspect-square bg-gradient-to-br ${p.tone} flex items-center justify-center group-hover:scale-[1.02] transition-transform`}
              >
                <span className="font-serif text-5xl text-ink-50/80">
                  {p.initial}
                </span>
              </div>
              <div className="mt-3 text-center">
                <p className="font-serif text-ink-50 text-sm">{p.name}</p>
                <p className="text-[10px] text-ink-500 tracking-wide mt-0.5">
                  {p.field.split(" ·")[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/people"
            className="text-sm text-ink-400 hover:text-ink-50 border-b border-ink-700 hover:border-bronze-400 pb-1"
          >
            모두 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
