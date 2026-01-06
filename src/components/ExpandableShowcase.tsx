"use client";
import Image from "next/image";
import NextLink from "next/link";
import { ExternalLink, Link as LinkIcon } from "lucide-react";
import { useState, useLayoutEffect, useRef } from "react";

export type ShowcaseItem = {
  title: string;
  stack: string;
  desc: string;
  image: string;
  url: string;
  tags: string[];
};

export default function ExpandableShowcase({
  items,
  viewAllHref,
  viewAllLabel,
  darkButtons,
}: {
  items: ShowcaseItem[];
  viewAllHref?: string;
  viewAllLabel?: string;
  darkButtons?: boolean;
}) {
  const [list] = useState(items);
  const [expanded, setExpanded] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState(280);
  const [visibleCount, setVisibleCount] = useState(3);
  const [hydrated] = useState(true);
  const PAGE_SIZE = 3;
  const [page, setPage] = useState(0);

  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const rotatePrev = () => setPage((p) => (p - 1 + pageCount) % pageCount);
  const rotateNext = () => setPage((p) => (p + 1) % pageCount);

  useLayoutEffect(() => {
    const update = () => {
      const width = containerRef.current?.offsetWidth || window.innerWidth || 0;
      let count: number;
      let cw: number;
      if (width <= 480) {
        count = 1;
        cw = Math.min(420, width - 32);
      } else if (width <= 768) {
        count = 2;
        cw = Math.floor((width - 24) / count);
        cw = Math.max(240, Math.min(300, cw));
      } else {
        count = 3;
        cw = Math.max(280, Math.min(360, Math.floor((width - 48) / count)));
      }
      setCardWidth(cw);
      setVisibleCount(Math.min(count, list.length));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [list.length]);

  // Mobile/Tablet: slider dengan window berdasarkan visibleCount
  if (!hydrated) {
    return <div ref={containerRef} className="mt-6" />;
  }

  if (visibleCount <= 2) {
    const start = page * PAGE_SIZE;
    const visibleItems = list.slice(start, start + PAGE_SIZE);
    return (
      <div ref={containerRef} className="mt-6 w-full">
        <ul
          className="flex items-stretch justify-center gap-4"
          aria-live="polite"
        >
          {visibleItems.map((p, idx) => (
            <li
              key={p.title}
              className="group bg-card border-border relative overflow-hidden rounded-xl border"
              style={{ width: cardWidth }}
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              <div className="relative h-40 w-full">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  unoptimized
                />
                <div className="bg-accent/20 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold group-hover:text-black">
                      {p.title}
                    </h4>
                  </div>
                  <ExternalLink className="size-4 opacity-75" />
                </div>
                <div
                  className={`ease transition-[max-height,opacity] duration-300 ${expanded === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-foreground/80 mt-3 text-sm group-hover:text-black">
                    {p.desc}
                  </p>
                  <div className="mt-3">
                    <div className="text-foreground mb-1 text-xs group-hover:text-black">
                      Tags
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="bg-accent/15 border-accent/30 text-foreground rounded-full border px-2 py-1 text-[11px] group-hover:text-black"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={rotatePrev}
            className={`border-accent/30 bg-accent/15 ${darkButtons ? "text-black" : "text-foreground"} hover:bg-accent/25 rounded-full border px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5`}
          >
            Prev
          </button>
          {viewAllHref && (
            <NextLink
              href={viewAllHref}
              className={`${darkButtons ? "border-black/30 hover:border-black/40" : "border-brand/30 hover:border-white/20"} bg-brand/15 ${darkButtons ? "text-black" : "text-foreground"} hover:bg-brand/25 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5`}
              aria-label={viewAllLabel ?? "View All Projects"}
            >
              <LinkIcon className="size-3" /> {viewAllLabel ?? "View All"}
            </NextLink>
          )}
          <button
            onClick={rotateNext}
            className={`border-accent/30 bg-accent/15 ${darkButtons ? "text-black" : "text-foreground"} hover:bg-accent/25 rounded-full border px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5`}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Desktop: layout horizontal dengan expand on hover
  return (
    <div ref={containerRef} className="mt-6 pb-4">
      <div className="flex justify-center gap-4">
        {list
          .slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
          .map((p, idx) => {
            const isOpen = expanded === idx;
            return (
              <div
                key={p.title}
                className={`group bg-card border-border hover:bg-accent/10 relative w-[320px] overflow-hidden rounded-xl border transition-[transform,border,width] hover:border-white/20 ${isOpen ? "md:w-[380px]" : ""}`}
                onMouseEnter={() => setExpanded(idx)}
                onMouseLeave={() => setExpanded(null)}
                onFocus={() => setExpanded(idx)}
                onBlur={() => setExpanded(null)}
                role="group"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    unoptimized
                  />
                  <div className="bg-accent/20 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-semibold group-hover:text-black">
                        {p.title}
                      </h4>
                    </div>
                    <ExternalLink className="size-4 opacity-75" />
                  </div>
                  <div
                    className={`ease transition-[max-height,opacity] duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-foreground/80 mt-3 text-sm group-hover:text-black">
                      {p.desc}
                    </p>
                    <div className="mt-3">
                      <div className="text-foreground mb-1 text-xs group-hover:text-black">
                        Tags
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="bg-accent/15 border-accent/30 text-foreground rounded-full border px-2 py-1 text-[11px] group-hover:text-black"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={rotatePrev}
          className={`border-accent/30 bg-accent/15 ${darkButtons ? "text-black" : "text-foreground"} hover:bg-accent/25 rounded-full border px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5`}
        >
          Prev
        </button>
        {viewAllHref && (
          <NextLink
            href={viewAllHref}
            className={`${darkButtons ? "border-black/30 hover:border-black/40" : "border-brand/30 hover:border-white/20"} bg-brand/15 ${darkButtons ? "text-black" : "text-foreground"} hover:bg-brand/25 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5`}
            aria-label={viewAllLabel ?? "View All Projects"}
          >
            <LinkIcon className="size-3" /> {viewAllLabel ?? "View All"}
          </NextLink>
        )}
        <button
          onClick={rotateNext}
          className={`border-accent/30 bg-accent/15 ${darkButtons ? "text-black" : "text-foreground"} hover:bg-accent/25 rounded-full border px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
