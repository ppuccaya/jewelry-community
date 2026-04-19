"use client";

import Link from "next/link";

export function LockOverlay({ message }: { message?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-ink-50/40 via-ink-50/90 to-ink-50 backdrop-blur-[2px]">
      <div className="text-center px-6 pb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <svg
            className="w-4 h-4 text-bronze-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 11c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3m6 0h2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2h2m8 0V7a4 4 0 10-8 0v4m8 0H7"
            />
          </svg>
          <p className="eyebrow text-bronze-700">Members Only</p>
        </div>
        <p className="text-ink-700 text-sm mb-5 leading-relaxed">
          {message ?? "여기서부터는 멤버만 읽을 수 있어요."}
        </p>
        <Link
          href="/members"
          className="inline-block bg-ink-900 hover:bg-ink-800 text-ink-50 text-xs font-medium px-5 py-2.5 tracking-wide transition-colors"
        >
          멤버 라운지에서 보기 →
        </Link>
      </div>
    </div>
  );
}

export function LockedCard({ children, message }: { children: React.ReactNode; message?: string }) {
  return (
    <div className="relative">
      <div className="pointer-events-none select-none">{children}</div>
      <LockOverlay message={message} />
    </div>
  );
}

export function LockBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] tracking-wide text-bronze-700 bg-bronze-100 px-2 py-0.5 rounded-sm">
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
      MEMBERS
    </span>
  );
}
