"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { JournalEntryRow } from "@/types";

const TONE_PRESETS = [
  { label: "어두운 황토", value: "from-ink-700 via-bronze-600 to-ink-800" },
  { label: "따뜻한 브론즈", value: "from-bronze-400 via-bronze-700 to-ink-900" },
  { label: "깊은 밤", value: "from-ink-800 via-ink-900 to-bronze-700" },
  { label: "석양", value: "from-ink-500 via-ink-700 to-bronze-600" },
  { label: "안개", value: "from-ink-200 via-ink-400 to-ink-700" },
  { label: "은은한 가을", value: "from-bronze-300 via-bronze-500 to-ink-600" },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w가-힣-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function JournalForm({ entry }: { entry?: JournalEntryRow }) {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    slug: entry?.slug ?? "",
    date: entry?.date ?? "",
    title: entry?.title ?? "",
    place: entry?.place ?? "",
    tag: entry?.tag ?? "",
    cover_tone: entry?.cover_tone ?? TONE_PRESETS[0].value,
    teaser: entry?.teaser ?? "",
    body: entry?.body ?? "",
    is_public: entry?.is_public ?? false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!entry && form.title && !form.slug) {
      const auto = slugify(form.title) || `entry-${Date.now()}`;
      setForm((f) => ({ ...f, slug: auto }));
    }
  }, [form.title, entry, form.slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      place: form.place || null,
      tag: form.tag || null,
      body: form.body || null,
    };

    if (entry) {
      await supabase.from("journal_entries").update(payload).eq("id", entry.id);
    } else {
      await supabase.from("journal_entries").insert([payload]);
    }
    router.push("/admin/journal");
    router.refresh();
  }

  async function handleDelete() {
    if (!entry || !confirm("삭제할까요?")) return;
    await supabase.from("journal_entries").delete().eq("id", entry.id);
    router.push("/admin/journal");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div className="card">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label">날짜 *</label>
            <input
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="input"
              placeholder="2026.03.22"
            />
          </div>
          <div>
            <label className="label">장소</label>
            <input
              value={form.place}
              onChange={(e) => setForm({ ...form, place: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="label">태그</label>
            <input
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              className="input"
              placeholder="정기 모임, 문화 경험 등"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="label">제목 *</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input"
          />
        </div>

        <div className="mt-4">
          <label className="label">URL 슬러그 *</label>
          <input
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="input font-mono text-sm"
            placeholder="자동 생성됩니다"
          />
          <p className="text-xs text-gray-400 mt-1">
            /journal/{form.slug || "..."}
          </p>
        </div>

        <div className="mt-4">
          <label className="label">커버 톤</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {TONE_PRESETS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setForm({ ...form, cover_tone: t.value })}
                className={`relative h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  form.cover_tone === t.value
                    ? "border-gold-500"
                    : "border-transparent"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${t.value}`}
                />
                <span className="relative text-xs text-white drop-shadow px-2 py-1 inline-block">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <label className="label">요약 문단 (첫 문단, 목록과 상세 상단에 노출) *</label>
        <textarea
          required
          value={form.teaser}
          onChange={(e) => setForm({ ...form, teaser: e.target.value })}
          rows={3}
          className="input resize-none"
        />

        <label className="label mt-4">본문 (빈 줄로 문단 구분)</label>
        <textarea
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          rows={10}
          className="input resize-none font-mono text-sm"
          placeholder="여러 문단은 빈 줄로 구분해주세요."
        />
      </div>

      <div className="card flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_public}
            onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
          />
          <span>전체 공개 (체크 해제 시 멤버 전용 · 목록에서 자물쇠)</span>
        </label>
        <div className="flex gap-2">
          {entry && (
            <button
              type="button"
              onClick={handleDelete}
              className="btn-danger text-sm"
            >
              삭제
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push("/admin/journal")}
            className="btn-secondary text-sm"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary text-sm disabled:opacity-50"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </form>
  );
}
