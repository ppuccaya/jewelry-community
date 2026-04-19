"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PublicPerson } from "@/types";

const TONE_PRESETS = [
  "from-ink-800 to-bronze-700",
  "from-bronze-600 to-ink-800",
  "from-ink-700 to-ink-500",
  "from-bronze-400 to-bronze-700",
  "from-ink-400 to-ink-700",
  "from-ink-600 to-bronze-500",
];

const emptyForm = {
  initial: "",
  name: "",
  field: "",
  since: "",
  tone: TONE_PRESETS[0],
  one_liner: "",
  tags: "",
  public_story: "",
};

export default function AdminPeoplePage() {
  const [people, setPeople] = useState<PublicPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const supabase = createClient();

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("public_people")
      .select("*")
      .order("order_num", { ascending: true });
    setPeople((data as PublicPerson[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(p: PublicPerson) {
    setForm({
      initial: p.initial,
      name: p.name,
      field: p.field,
      since: p.since ?? "",
      tone: p.tone,
      one_liner: p.one_liner,
      tags: p.tags?.join(", ") ?? "",
      public_story: p.public_story ?? "",
    });
    setEditingId(p.id);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      initial: form.initial,
      name: form.name,
      field: form.field,
      since: form.since || null,
      tone: form.tone,
      one_liner: form.one_liner,
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : null,
      public_story: form.public_story || null,
    };
    if (editingId) {
      await supabase.from("public_people").update(payload).eq("id", editingId);
    } else {
      await supabase
        .from("public_people")
        .insert([{ ...payload, order_num: people.length + 1 }]);
    }
    setModalOpen(false);
    fetchAll();
  }

  async function handleDelete() {
    if (!editingId || !confirm("삭제할까요?")) return;
    await supabase.from("public_people").delete().eq("id", editingId);
    setModalOpen(false);
    fetchAll();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">사람들 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            /people 페이지에 표시되는 멤버 카드를 관리합니다.
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">
          + 멤버 추가
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">불러오는 중...</p>
      ) : people.length === 0 ? (
        <div className="card text-center py-12 text-gray-400">
          등록된 멤버가 없습니다.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {people.map((p) => (
            <button
              key={p.id}
              onClick={() => openEdit(p)}
              className="card text-left hover:border-gold-300 transition-colors"
            >
              <div
                className={`aspect-[3/1] bg-gradient-to-br ${p.tone} rounded-lg flex items-center justify-center mb-3`}
              >
                <span className="text-white font-serif text-4xl opacity-80">
                  {p.initial}
                </span>
              </div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-xs text-gray-500 mb-1">{p.field}</p>
              <p className="text-xs text-gray-400 italic">{p.one_liner}</p>
              <p className="text-xs mt-2">
                {p.public_story ? (
                  <span className="text-green-600">공개 스토리 있음</span>
                ) : (
                  <span className="text-gray-400">상세는 자물쇠</span>
                )}
              </p>
            </button>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? "멤버 수정" : "멤버 추가"}
            </h2>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="label">이니셜 *</label>
                  <input
                    required
                    maxLength={2}
                    value={form.initial}
                    onChange={(e) => setForm({ ...form, initial: e.target.value })}
                    className="input text-center font-bold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="label">이름 *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                  />
                </div>
              </div>
              <div>
                <label className="label">분야 *</label>
                <input
                  required
                  value={form.field}
                  onChange={(e) => setForm({ ...form, field: e.target.value })}
                  className="input"
                  placeholder="주얼리 브랜드 운영 · 종로"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">가입 연도</label>
                  <input
                    value={form.since}
                    onChange={(e) => setForm({ ...form, since: e.target.value })}
                    className="input"
                    placeholder="2024"
                  />
                </div>
                <div>
                  <label className="label">태그 (쉼표 구분)</label>
                  <input
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    className="input"
                    placeholder="모임장, 운영"
                  />
                </div>
              </div>
              <div>
                <label className="label">한 줄 소개 *</label>
                <input
                  required
                  value={form.one_liner}
                  onChange={(e) =>
                    setForm({ ...form, one_liner: e.target.value })
                  }
                  className="input"
                  placeholder="조용한 관찰자"
                />
              </div>
              <div>
                <label className="label">공개 스토리 (선택 - 비워두면 자물쇠)</label>
                <textarea
                  value={form.public_story}
                  onChange={(e) =>
                    setForm({ ...form, public_story: e.target.value })
                  }
                  rows={3}
                  className="input resize-none"
                />
              </div>
              <div>
                <label className="label">카드 배경 톤</label>
                <div className="grid grid-cols-3 gap-2">
                  {TONE_PRESETS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, tone: t })}
                      className={`h-12 rounded bg-gradient-to-br ${t} border-2 ${
                        form.tone === t
                          ? "border-gold-500"
                          : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn-danger text-sm"
                  >
                    삭제
                  </button>
                )}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary text-sm"
                >
                  취소
                </button>
                <button type="submit" className="btn-primary text-sm">
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
