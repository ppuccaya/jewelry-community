"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function InquirySection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const supabase = createClient();
    const { error } = await supabase.from("inquiries").insert([form]);

    if (error) {
      setStatus("error");
    } else {
      setStatus("done");
      setForm({ name: "", phone: "", message: "" });
    }
  }

  return (
    <section id="inquiry" className="py-24 px-6 bg-gray-900 text-white">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            입회 문의
          </h2>
          <p className="text-gray-400 text-lg">
            관심 있으신가요? 연락처를 남겨주시면 안내드릴게요.
          </p>
        </div>

        {status === "done" ? (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">✨</p>
            <p className="text-xl font-medium text-gold-400">문의가 접수되었어요!</p>
            <p className="text-gray-400 mt-2">곧 연락드리겠습니다.</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm text-gray-400 hover:text-white underline"
            >
              다시 문의하기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                이름 <span className="text-gold-400">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="홍길동"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                연락처 <span className="text-gold-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="010-0000-0000"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                메시지 (선택)
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="간단한 자기소개나 궁금한 점을 남겨주세요."
                rows={4}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">
                오류가 발생했어요. 잠시 후 다시 시도해주세요.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors mt-2"
            >
              {status === "loading" ? "전송 중..." : "문의 보내기"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
