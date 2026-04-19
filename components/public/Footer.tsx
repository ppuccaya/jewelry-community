export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300 py-16 mt-24">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <p className="eyebrow text-bronze-400 mb-3">Private Circle</p>
            <h3 className="font-serif text-2xl text-ink-50 mb-2">사업가의 격식</h3>
            <p className="text-sm text-ink-400 leading-relaxed">
              사업가이기 전에 한 인간으로서 더 잘 살고,<br />
              그것이 사업으로 연결되는 선순환.
            </p>
          </div>

          <div>
            <p className="eyebrow text-bronze-400 mb-3">Navigate</p>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-ink-50">소개</a></li>
              <li><a href="/program" className="hover:text-ink-50">프로그램</a></li>
              <li><a href="/apply" className="hover:text-ink-50">참여 신청</a></li>
              <li><a href="/members" className="hover:text-ink-50">멤버 라운지</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-bronze-400 mb-3">Inquiry</p>
            <p className="text-sm text-ink-400 leading-relaxed mb-3">
              궁금한 점이 있으신가요?<br />
              익명으로도 문의하실 수 있습니다.
            </p>
            <a
              href="/#inquiry"
              className="inline-block text-sm border-b border-bronze-400 text-ink-50 hover:text-bronze-200"
            >
              문의 남기기 →
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-ink-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-ink-500">
          <p>© {new Date().getFullYear()} 사업가의 격식 · All rights reserved.</p>
          <p className="tracking-wide">By invitation only</p>
        </div>
      </div>
    </footer>
  );
}
