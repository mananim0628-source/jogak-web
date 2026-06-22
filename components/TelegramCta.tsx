export default function TelegramCta() {
  return (
    <section className="mt-12 rounded-2xl border border-gold/30 bg-gradient-to-br from-[#22183d] to-[#0d0820] p-8 text-center">
      <p className="text-sm text-gold tracking-widest uppercase mb-3">
        같이 갈 일행 찾기
      </p>
      <h3 className="text-2xl font-bold text-white mb-2">
        비싼 경험, 혼자 가긴 부담?
      </h3>
      <p className="text-gray-300 mb-6 text-sm leading-relaxed">
        같이 갈 일행끼리 비용을 나누면 프리미엄 경험의 문턱이 낮아집니다.
        <br />
        텔레그램에서 현재 모집 중인 조각 모임을 확인하세요.
      </p>
      <a
        href="https://t.me/jogakdotcom"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gradient-to-r from-pink to-gold text-white font-bold px-8 py-3 rounded-full text-sm tracking-wide hover:opacity-90 transition"
      >
        @jogakdotcom 참여하기
      </a>
      <p className="mt-4 text-xs text-gray-500">
        인스타그램:{" "}
        <a
          href="https://instagram.com/jogak_note"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold/70 hover:text-gold transition"
        >
          @jogak_note
        </a>
      </p>
    </section>
  );
}
