"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewActivityPage() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title: form.title,
          date: form.date,
          time: form.time || null,
          location: form.location || null,
          notes: form.notes || null,
        },
      ])
      .select("id")
      .single();

    if (!error && data) {
      router.push(`/admin/activities/${data.id}`);
    }
    setLoading(false);
  }

  return (
    <div>
      <button
        onClick={() => router.push("/admin/activities")}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
      >
        &larr; 활동 목록
      </button>

      <div className="card max-w-lg">
        <h1 className="text-xl font-bold text-gray-900 mb-4">새 활동 등록</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="label">행사명 *</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input"
              placeholder="예: 4월 와인 모임"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">날짜 *</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">시간</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="input"
              />
            </div>
          </div>
          <div>
            <label className="label">장소</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="input"
              placeholder="예: 종로3가 OO레스토랑"
            />
          </div>
          <div>
            <label className="label">메모</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="input resize-none"
              rows={3}
            />
          </div>
          <div className="flex gap-2 pt-2 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary text-sm"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-sm disabled:opacity-50"
            >
              {loading ? "등록 중..." : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
