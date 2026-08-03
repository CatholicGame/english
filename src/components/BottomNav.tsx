"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BASE = "/modules/collocations-phrasal-verbs";

const TABS = [
  {
    href: BASE,
    label: "Today",
    match: (p: string) => p === BASE,
    icon: (
      <path d="M3 9.5 12 2l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    ),
    icon2: <path d="M9 22V12h6v10" />,
  },
  {
    href: `${BASE}/verbs`,
    label: "Verbs",
    match: (p: string) => p.startsWith(`${BASE}/verbs`),
    icon: (
      <>
        <path d="M8 6h13" />
        <path d="M8 12h13" />
        <path d="M8 18h13" />
        <path d="M3 6h.01" />
        <path d="M3 12h.01" />
        <path d="M3 18h.01" />
      </>
    ),
  },
  {
    href: `${BASE}/progress`,
    label: "Progress",
    match: (p: string) => p.startsWith(`${BASE}/progress`),
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </>
    ),
  },
  {
    href: "/",
    label: "Home",
    match: (p: string) => p === "/",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <div className="divider-t flex h-[74px] gap-px bg-bg lg:h-full lg:flex-col lg:gap-1 lg:border-t-0 lg:p-3">
      {TABS.map((t) => {
        const active = t.match(pathname);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`flex-1 pt-3.5 text-center text-[9px] font-extrabold tracking-wider uppercase lg:flex lg:flex-none lg:items-center lg:justify-start lg:gap-3 lg:px-3 lg:py-2.5 lg:text-left lg:text-[13px] lg:normal-case lg:tracking-normal lg:pt-0 ${
              active ? "text-accent lg:bg-accent-100" : "text-neutral-600"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-1.5 block h-5 w-5 lg:mx-0 lg:mb-0 lg:flex-none"
            >
              {t.icon}
              {"icon2" in t ? t.icon2 : null}
            </svg>
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
