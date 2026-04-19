"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { JournalEntryRow } from "@/types";

export default function AdminJournalPage() {
  const [entries, setEntries] = useState<JournalEntryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("journal_entries")
      .select("*")
      .order("date", { ascending: false });
    setEntries((data as JournalEntryRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function togglePublic(id: string, value: boolean) {
    await supabase
      .from("journal_entries")
      .update({ is_public: value })
      .eq("id", id);
    fetchAll();
  }

  async function deleteEntry(id: string) {
    if (!confirm("이 일지를 삭제할까요?")) return;
    await supabase.from("journal_entries").delete().eq("id", id);
    fetchAll();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">모임 일지 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            /journal 페이지에 표시되는 모임 기록을 관리합니다.
          </p>
        </div>
        <Link href="/admin/journal/new" className="btn-primary text-sm">
          + 새 일지
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">불러오는 중...</p>
      ) : entries.length === 0 ? (
        <div className="card text-center py-12 text-gray-400">
          등록된 일지가 없습니다. 위 버튼으로 추가해보세요.
        </div>
      ) : (
        <div className="card divide-y divide-gray-100">
          {entries.map((e) => (
            <div key={e.id} className="py-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400">{e.date}</span>
                  {e.tag && (
                    <span className="text-xs text-gold-700 bg-gold-50 px-2 py-0.5 rounded">
                      {e.tag}
                    </span>
                  )}
                </div>
                <p className="font-medium text-gray-900">{e.title}</p>
                {e.place && (
                  <p className="text-xs text-gray-500 mt-0.5">{e.place}</p>
                )}
              </div>
              <label className="flex items-center gap-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={e.is_public}
                  onChange={(ev) => togglePublic(e.id, ev.target.checked)}
                />
                <span className={e.is_public ? "text-green-600" : "text-gray-400"}>
                  {e.is_public ? "전체 공개" : "멤버 전용"}
                </span>
              </label>
              <Link
                href={`/admin/journal/${e.id}`}
                className="text-xs text-gold-700 hover:text-gold-900"
              >
                수정
              </Link>
              <button
                onClick={() => deleteEntry(e.id)}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
