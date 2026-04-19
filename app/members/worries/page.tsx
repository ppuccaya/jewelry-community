"use client";

import { useState, useEffect, useCallback } from "react";
import MembersShell from "@/components/public/MembersShell";
import { createClient } from "@/lib/supabase/client";

interface Worry {
  id: string;
  content: string;
  created_at: string;
}

export default function WorriesPage() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [worries, setWorries] = useState<Worry[]>([]);

  const supabase = createClient();

  const fetchWorries = useCallback(async () => {
    const { data } = await supabase
      .from("anonymous_worries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setWorries(data as Worry[]);
  }, []);

  useEffect(() => {
    fetchWorries();
  }, [fetchWorries]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setStatus("loading");
    const { error } = await supabase
      .from("anonymous_worries")
      .insert([{ content }]);
    if (error) {
      setStatus("error");
    } else {
      setStatus("done");
      setContent("");
      fetchWorries();
      setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <MembersShell
      eyebrow="Worries"
      title="익명 고민 함"
      description="모임 전, 누구인지 밝히지 않고 고민을 남겨주세요. 운영진만이 먼저 읽고, 모임에서 조심스럽게 다룹니다."
    >
      <div className="grid lg:grid-cols-5 gap-8 max-w-6xl">
        {/* 작성 폼 */}
        <div className="lg:col-span-2">
          <div className="bg-ink-900 border border-ink-800 p-6 md:p-8">
            <p className="eyebrow text-bronze-400 mb-3">Leave Anonymously</p>
            <h3 className="font-serif text-lg text-ink-50 mb-6 leading-relaxed">
              이름 없이도 괜찮습니다.
              <br />
              조용히 적어주세요.
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                required
                placeholder="마음에 걸려 있는 것을 편하게 적어주세요."
                className="w-full bg-transparent border border-ink-700 focus:border-bronze-400 p-3 text-ink-50 placeholder-ink-600 text-sm resize-none focus:outline-none leading-relaxed"
              />
              <button
                type="submit"
                disabled={status === "loading" || !content.trim()}
                className="w-full bg-bronze-500 hover:bg-bronze-600 disabled:opacity-40 text-ink-50 font-medium py-3 tracking-wide transition-colors text-sm"
              >
                {status === "loading"
                  ? "전송 중..."
                  : status === "done"
                  ? "전달되었습니다"
                  : "익명으로 남기기"}
              </button>
              {status === "error" && (
                <p className="text-red-400 text-xs">
                  오류가 발생했습니다. 다시 시도해주세요.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* 최근 고민 (익명 리스트) */}
        <div className="lg:col-span-3">
          <p className="eyebrow text-bronze-400 mb-3">Shared in Silence</p>
          <h3 className="font-serif text-lg text-ink-50 mb-6">
            지금까지 나눠진 이야기
          </h3>

          {worries.length === 0 ? (
            <div className="bg-ink-900 border border-ink-800 p-10 text-center text-ink-500 text-sm">
              아직 등록된 고민이 없습니다. 첫 이야기를 남겨주세요.
            </div>
          ) : (
            <div className="space-y-3">
              {worries.map((w) => (
                <article
                  key={w.id}
                  className="bg-ink-900 border border-ink-800 p-5 border-l-2 border-l-bronze-500"
                >
                  <p className="text-ink-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {w.content}
                  </p>
                  <p className="text-[10px] text-ink-600 mt-3 tracking-wide">
                    {new Date(w.created_at).toLocaleDateString("ko-KR")} · 익명
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </MembersShell>
  );
}
