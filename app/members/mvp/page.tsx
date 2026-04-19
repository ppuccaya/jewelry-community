import MembersShell from "@/components/public/MembersShell";

export default function MvpPage() {
  return (
    <MembersShell eyebrow="Annual MVP" title="연간 MVP">
      <div className="bg-ink-900 border border-ink-800 p-10 text-center text-ink-500 text-sm max-w-3xl">
        아직 선정된 MVP가 없습니다.
      </div>
    </MembersShell>
  );
}
