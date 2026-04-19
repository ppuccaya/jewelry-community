import MembersNav from "@/components/public/MembersNav";

export default function MembersShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ink-950 text-ink-100">
      <MembersNav />
      <main className="flex-1 p-10 md:p-14 overflow-auto">
        <header className="mb-12">
          <p className="eyebrow text-bronze-400 mb-3">{eyebrow}</p>
          <h1 className="font-serif text-3xl md:text-4xl text-ink-50 mb-3">
            {title}
          </h1>
          <div className="w-12 h-px bg-bronze-400 mb-4" />
          {description && (
            <p className="text-ink-400 text-sm leading-relaxed max-w-xl">
              {description}
            </p>
          )}
        </header>
        {children}
      </main>
    </div>
  );
}
