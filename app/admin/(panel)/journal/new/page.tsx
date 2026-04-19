import JournalForm from "@/components/admin/JournalForm";

export default function NewJournalPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">새 일지 작성</h1>
      <JournalForm />
    </div>
  );
}
