"use client";

import { useState } from "react";
import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import { createClient } from "@/lib/supabase/client";

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    job: "",
    motivation: "",
    referral: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.from("applications").insert([form]);

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("done");
    }
  }

  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24 min-h-screen">
        <section className="py-16 md:py-24">
          <div className="container-narrow">
            {/* 헤더 */}
            <div className="text-center mb-16">
              <p className="eyebrow mb-6">Application</p>
              <h1 className="font-serif text-4xl md:text-5xl text-ink-900 leading-tight mb-8">
                참여 신청
              </h1>
              <div className="divider mx-auto mb-8" />
              <p className="text-ink-600 leading-relaxed max-w-lg mx-auto">
                신청서를 남겨주시면, 운영진이 조용히 검토 후
                <br />
                개별적으로 연락드립니다. 답변까지 다소 시간이 걸릴 수 있습니다.
              </p>
            </div>

            {status === "done" ? (
              <div className="bg-ink-100 border border-ink-200 py-20 px-6 text-center">
                <div className="w-12 h-px bg-bronze-400 mx-auto mb-6" />
                <h2 className="font-serif text-2xl text-ink-900 mb-4">
                  신청이 접수되었습니다.
                </h2>
                <p className="text-ink-600 leading-relaxed max-w-md mx-auto">
                  보내주신 이야기를 천천히 읽어보겠습니다.
                  <br />
                  진심을 다해 검토 후, 조만간 연락드리겠습니다.
                </p>
                <div className="mt-10">
                  <a
                    href="/"
                    className="text-xs text-ink-500 hover:text-ink-900 underline underline-offset-4 tracking-wide"
                  >
                    메인으로 돌아가기
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-ink-200 p-8 md:p-12 space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="field-label">이름 *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="field-input"
                      placeholder="본명을 적어주세요"
                    />
                  </div>
                  <div>
                    <label className="field-label">연락처 *</label>
                    <input
                      type="text"
                      required
                      value={form.contact}
                      onChange={(e) =>
                        setForm({ ...form, contact: e.target.value })
                      }
                      className="field-input"
                      placeholder="전화번호 또는 이메일"
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label">하시는 일 *</label>
                  <input
                    type="text"
                    required
                    value={form.job}
                    onChange={(e) => setForm({ ...form, job: e.target.value })}
                    className="field-input"
                    placeholder="예 : 종로에서 주얼리 브랜드를 운영합니다"
                  />
                </div>

                <div>
                  <label className="field-label">지원 동기 *</label>
                  <textarea
                    required
                    value={form.motivation}
                    onChange={(e) =>
                      setForm({ ...form, motivation: e.target.value })
                    }
                    rows={6}
                    className="field-input resize-none"
                    placeholder="이 모임에서 어떤 경험을 기대하시는지, 편하게 적어주세요."
                  />
                </div>

                <div>
                  <label className="field-label">
                    추천인 (선택)
                  </label>
                  <input
                    type="text"
                    value={form.referral}
                    onChange={(e) =>
                      setForm({ ...form, referral: e.target.value })
                    }
                    className="field-input"
                    placeholder="알고 계신 멤버가 있다면 이름을 적어주세요"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm">
                    오류가 발생했어요 : {errorMsg || "잠시 후 다시 시도해주세요."}
                  </p>
                )}

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-ink-900 hover:bg-ink-800 disabled:opacity-50 text-ink-50 font-medium px-12 py-4 tracking-wide transition-colors"
                  >
                    {status === "loading" ? "전송 중..." : "신청 보내기"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
