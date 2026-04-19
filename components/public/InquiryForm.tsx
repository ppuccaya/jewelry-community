"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function InquiryForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("loading");

    const supabase = createClient();
    const { error } = await supabase.from("inquiries").insert([
      { name: "익명", phone: "-", message },
    ]);

    if (error) setStatus("error");
    else {
      setStatus("done");
      setMessage("");
    }
  }

  return (
    <section id="inquiry" className="py-24 bg-ink-900 text-ink-100">
      <div className="container-narrow">
        <div className="text-center mb-10">
          <p className="eyebrow text-bronze-400 mb-4">Anonymous</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            익명 문의
          </h2>
          <div className="w-12 h-px bg-bronze-400 mx-auto" />
        </div>

        {status === "done" ? (
          <div className="text-center py-8">
            <p className="font-serif text-xl text-ink-50 mb-2">
              전달되었습니다.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-xs text-ink-500 hover:text-ink-200 underline underline-offset-4"
            >
              다시 남기기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="무엇이든 편하게 적어주세요."
              required
              className="w-full bg-transparent border border-ink-700 focus:border-bronze-400 px-4 py-4 text-ink-50 placeholder-ink-500 focus:outline-none resize-none leading-relaxed"
            />

            {status === "error" && (
              <p className="text-red-400 text-sm mt-3">
                오류가 발생했습니다.
              </p>
            )}

            <div className="text-center mt-5">
              <button
                type="submit"
                disabled={status === "loading" || !message.trim()}
                className="bg-bronze-500 hover:bg-bronze-600 disabled:opacity-40 text-ink-50 font-medium px-10 py-3 tracking-wide transition-colors"
              >
                {status === "loading" ? "전송 중..." : "보내기"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
