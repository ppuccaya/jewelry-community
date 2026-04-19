import MembersShell from "@/components/public/MembersShell";

export default function SchedulePage() {
  return (
    <MembersShell eyebrow="Schedule" title="일정">
      <div className="bg-ink-900 border border-ink-800 p-10 text-center text-ink-500 text-sm max-w-3xl">
        아직 등록된 일정이 없습니다.
      </div>
    </MembersShell>
  );
}
