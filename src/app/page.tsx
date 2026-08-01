import Link from "next/link";
import { MODULES } from "@/data/modules";

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg">
      <div className="divider-b px-4 py-6">
        <h1 className="text-[30px]">English App</h1>
        <p className="mt-1 text-[13px] text-neutral-600">Choose a topic to start practicing.</p>
      </div>

      <div className="flex-1 px-4 py-4">
        <div className="label-xs mb-2">Topics</div>
        <div className="flex flex-col gap-2">
          {MODULES.map((m) =>
            m.available ? (
              <Link
                key={m.slug}
                href={`/modules/${m.slug}`}
                className="block border border-transparent bg-surface p-4 transition-colors hover:border-accent"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-[19px]">{m.title}</h2>
                  <span className="label-xs whitespace-nowrap text-accent">{m.subtitle}</span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">{m.description}</p>
                <div className="mt-3 text-[11px] text-neutral-600">
                  {m.verbCount} verbs · {m.itemCount} phrases
                </div>
              </Link>
            ) : (
              <div key={m.slug} className="border border-dashed border-neutral-400 p-4 opacity-60">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-[19px]">{m.title}</h2>
                  <span className="label-xs whitespace-nowrap">Soon</span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">{m.description}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
