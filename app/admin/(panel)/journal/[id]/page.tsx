"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import JournalForm from "@/components/admin/JournalForm";
import { createClient } from "@/lib/supabase/client";
import type { JournalEntryRow } from "@/types";

export default function EditJournalPage() {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<JournalEntryRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("journal_entries")
      .select("*")
      .eq("id", id)
      .single()
      .then((res) => {
        if (res.data) setEntry(res.data as JournalEntryRow);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-gray-400">불러오는 중...</p>;
  if (!entry) return <p className="text-gray-400">일지를 찾을 수 없습니다.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">일지 수정</h1>
      <JournalForm entry={entry} />
    </div>
  );
}
