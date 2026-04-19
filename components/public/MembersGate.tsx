"use client";

import { useEffect, useState } from "react";

const PASSWORD_KEY = "members_access_v1";
// 초기 멤버 공유 비밀번호. 추후 제대로 된 인증으로 교체 예정.
const CURRENT_PASSWORD = "jongno2024";

export default function MembersGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(PASSWORD_KEY);
      if (saved === CURRENT_PASSWORD) setUnlocked(true);
      setChecked(true);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === CURRENT_PASSWORD) {
      localStorage.setItem(PASSWORD_KEY, input);
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!checked) return null;

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <div className="text-center mb-10">
            <p className="eyebrow text-bronze-400 mb-4">Members Only</p>
            <h1 className="font-serif text-3xl text-ink-50 mb-3">
              멤버 라운지
            </h1>
            <div className="w-12 h-px bg-bronze-400 mx-auto mb-4" />
            <p className="text-ink-400 text-sm leading-relaxed">
              멤버에게만 공유된 비밀번호를 입력해주세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              placeholder="비밀번호"
              required
              className="w-full bg-transparent border-b border-ink-700 focus:border-bronze-400 px-0 py-3 text-ink-50 placeholder-ink-500 focus:outline-none text-center tracking-wide"
              autoFocus
            />

            {error && (
              <p className="text-red-400 text-xs text-center">
                비밀번호가 올바르지 않습니다.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-bronze-500 hover:bg-bronze-600 text-ink-50 font-medium py-3 tracking-wide transition-colors"
            >
              입장하기
            </button>
          </form>

          <div className="mt-10 text-center">
            <a
              href="/"
              className="text-xs text-ink-500 hover:text-ink-200 underline underline-offset-4"
            >
              메인으로 돌아가기
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
