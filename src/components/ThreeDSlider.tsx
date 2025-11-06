"use client";
import Image from "next/image";
import NextLink from "next/link";
import { Link } from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";

type Item = { name: string; issuer: string; year: number; image: string; link: string };

export default function ThreeDSlider({ items, viewAllHref, viewAllLabel }: { items: Item[]; viewAllHref?: string; viewAllLabel?: string }) {
  const [list, setList] = useState(items);
  const GAP = 24;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(280);
  const [visibleCount, setVisibleCount] = useState(3);
  const [hydrated, setHydrated] = useState(false);

  const rotateArray = (arr: typeof list, k: number) => {
    const len = arr.length;
    const n = ((k % len) + len) % len;
    return [...arr.slice(n), ...arr.slice(0, n)];
  };

  useLayoutEffect(() => {
    const update = () => {
      setContainerWidth(containerRef.current?.offsetWidth || 0);
      const width = containerRef.current?.offsetWidth || window.innerWidth || 0;

      let count: number;
      let cw: number;

      if (width <= 425) {
        count = 1;
        cw = Math.min(420, width - 32);
      } else if (width <= 768) {
        count = 3;
        cw = Math.floor((width - GAP * (count - 1)) / count);
        cw = Math.max(240, Math.min(280, cw));
      } else {
        count = 3;
        cw = Math.floor((width - GAP * (count - 1)) / count);
        cw = Math.max(260, Math.min(320, cw));
      }

      setCardWidth(cw);
      setVisibleCount(Math.min(count, items.length));
    };
    update();
    window.addEventListener("resize", update);
    setHydrated(true);
    return () => window.removeEventListener("resize", update);
  }, [items.length]);

  const CENTER = Math.floor(list.length / 2);
  const leftCount = Math.floor(visibleCount / 2);
  const start = Math.max(0, CENTER - leftCount);
  const end = Math.min(list.length, start + visibleCount);
  const visibleItems = list.slice(start, end);
  const visibleCenter = Math.floor(visibleItems.length / 2);
  const ulWidth = visibleItems.length * cardWidth + (visibleItems.length - 1) * GAP;

  if (!hydrated) {
    return <div ref={containerRef} className="mt-6 relative mx-auto pb-10 w-full" />;
  }

  return (
    <div ref={containerRef} className="mt-6 relative mx-auto pb-10 w-full">
      <ul
        ref={listRef}
        className="flex gap-6 px-1 items-stretch mx-auto"
        style={{ width: ulWidth, perspective: 800 }}
        aria-live="polite"
      >
        {visibleItems.map((c, idx) => {
          const offset = idx - visibleCenter;
          const rotateY = Math.max(-20, Math.min(20, -offset * 12));
          const scale = idx === visibleCenter ? 1 : 0.92;
          return (
            <li
              key={c.name}
              className="relative rounded-xl border border-white/10 bg-background/50 overflow-hidden cursor-pointer"
              style={{ width: cardWidth, transform: `rotateY(${rotateY}deg) scale(${scale})`, transformStyle: "preserve-3d", transition: "transform 300ms ease" }}
              onClick={() => setList((arr) => rotateArray(arr, (start + idx) - CENTER))}
              aria-current={visibleCenter === idx}
            >
              <div className="relative h-36 w-full">
                <Image src={c.image} alt={c.name} fill className="object-cover" unoptimized />
              </div>
              <div className="p-4">
                <h4 className="text-base font-semibold">{c.name}</h4>
                <p className="mt-1 text-xs subtle">{c.issuer} · {c.year}</p>
                <a href={c.link} className="mt-3 inline-flex items-center gap-2 text-xs rounded-full border border-white/10 px-3 py-1.5 hover:border-white/20">
                  <Link className="size-3" /> View Certificate
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setList((arr) => [arr[arr.length - 1], ...arr.slice(0, -1)])}
          className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 text-xs"
          aria-label="Previous"
        >Prev</button>
        {viewAllHref && (
          <NextLink
            href={viewAllHref}
            className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 text-xs inline-flex items-center gap-2"
            aria-label={viewAllLabel ?? "View All Certificates"}
          >
            <Link className="size-3" /> {viewAllLabel ?? "View All"}
          </NextLink>
        )}
        <button
          onClick={() => setList((arr) => [...arr.slice(1), arr[0]])}
          className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 text-xs"
          aria-label="Next"
        >Next</button>
      </div>
    </div>
  );
}