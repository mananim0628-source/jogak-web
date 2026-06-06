export default function AuthorCard({
  author,
  authorNote,
  publishedAt,
  readingTime,
}: {
  author: string;
  authorNote: string;
  publishedAt: string;
  readingTime: number;
}) {
  const formatted = new Date(publishedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 my-8">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink to-gold flex items-center justify-center shrink-0 text-white font-bold text-sm">
        조
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{author}</p>
        <p className="text-gray-400 text-xs mt-0.5">{authorNote}</p>
        <p className="text-gray-500 text-xs mt-1">
          {formatted} · 읽는 시간 약 {readingTime}분
        </p>
      </div>
    </div>
  );
}
