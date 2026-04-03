"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Idea, IdeaTag, IdeaStatus } from "@/types";

const tags: IdeaTag[] = ["친목", "문화", "여행", "비즈니스", "기타"];
const statuses: IdeaStatus[] = ["아이디어", "검토중", "확정", "완료"];

const statusColors: Record<IdeaStatus, string> = {
  아이디어: "bg-blue-100 text-blue-700",
  검토중: "bg-yellow-100 text-yellow-700",
  확정: "bg-green-100 text-green-700",
  완료: "bg-gray-100 text-gray-500",
};

const tagColors: Record<IdeaTag, string> = {
  친목: "bg-pink-50 text-pink-600",
  문화: "bg-purple-50 text-purple-600",
  여행: "bg-sky-50 text-sky-600",
  비즈니스: "bg-amber-50 text-amber-600",
  기타: "bg-gray-50 text-gray-500",
};

const emptyForm = { title: "", description: "", tag: "기타" as IdeaTag };

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<IdeaStatus | "전체">("전체");

  const supabase = createClient();

  const fetchIdeas = useCallback(async () => {
    const { data } = await supabase
      .from("ideas")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setIdeas(data as Idea[]);
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(idea: Idea) {
    setForm({
      title: idea.title,
      description: idea.description ?? "",
      tag: idea.tag,
    });
    setEditingId(idea.id);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload = {
      title: form.title,
      description: form.description || null,
      tag: form.tag,
    };
    if (editingId) {
      await supabase.from("ideas").update(payload).eq("id", editingId);
    } else {
      await supabase.from("ideas").insert([payload]);
    }
    setModalOpen(false);
    setLoading(false);
    fetchIdeas();
  }

  async function changeStatus(id: string, status: IdeaStatus) {
    await supabase.from("ideas").update({ status }).eq("id", id);
    fetchIdeas();
  }

  async function handleReaction(id: string, current: number) {
    await supabase
      .from("ideas")
      .update({ reaction_count: current + 1 })
      .eq("id", id);
    fetchIdeas();
  }

  async function handleDelete() {
    if (!editingId || !confirm("이 아이디어를 삭제할까요?")) return;
    await supabase.from("ideas").delete().eq("id", editingId);
    setModalOpen(false);
    fetchIdeas();
  }

  const filtered =
    filterStatus === "전체"
      ? ideas
      : ideas.filter((i) => i.status === filterStatus);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">아이디어 판</h1>
        <button onClick={openCreate} className="btn-primary text-sm">
          + 아이디어 등록
        </button>
      </div>

      {/* 필터 */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["전체", ...statuses].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s as IdeaStatus | "전체")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filterStatus === s
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 아이디어 카드 그리드 */}
      {filtered.length === 0 ? (
        <div className="card text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">💡</p>
          <p>아이디어를 등록해보세요!</p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((idea) => (
            <div
              key={idea.id}
              className="card cursor-pointer hover:border-gold-200 transition-colors"
              onClick={() => openEdit(idea)}
            >
              <div className="flex items-start justify-between mb-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[idea.tag]}`}
                >
                  {idea.tag}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[idea.status]}`}
                >
                  {idea.status}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{idea.title}</h3>
              {idea.description && (
                <p className="text-sm text-gray-500 line-clamp-2">
                  {idea.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReaction(idea.id, idea.reaction_count);
                  }}
                  className="text-sm text-gray-400 hover:text-gold-600"
                >
                  👍 {idea.reaction_count}
                </button>
                <select
                  value={idea.status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    changeStatus(idea.id, e.target.value as IdeaStatus)
                  }
                  className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? "아이디어 수정" : "아이디어 등록"}
            </h2>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="label">제목 *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="input"
                  placeholder="예: 제주도 워크숍"
                />
              </div>
              <div>
                <label className="label">설명</label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="input resize-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="label">태그</label>
                <div className="flex gap-2 flex-wrap">
                  {tags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, tag: t })}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        form.tag === t
                          ? "bg-gold-500 text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {t}
                    </button>
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
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-sm disabled:opacity-50"
                >
                  {loading ? "저장 중..." : "저장"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
