import type { FaqItem } from "@/lib/content";

export default function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-white mb-6">자주 묻는 질문</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details
            key={i}
            className="group border border-white/10 rounded-xl bg-white/5 open:bg-white/8"
          >
            <summary className="flex items-center justify-between gap-3 cursor-pointer p-5 text-white font-medium list-none">
              <span>{item.q}</span>
              <span className="text-gold shrink-0 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-gray-300 leading-relaxed text-sm">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
