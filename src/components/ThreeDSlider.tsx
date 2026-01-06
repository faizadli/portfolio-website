"use client";
import Image from "next/image";
import { Link } from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";
import ActionPill from "./ActionPill";

type Item = {
  name: string;
  issuer: string;
  year: number;
  image: string;
  link: string;
};

export default function ThreeDSlider({
  items,
  viewAllHref,
  viewAllLabel,
}: {
  items: Item[];
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  const [list, setList] = useState(items);
  const GAP = 24;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [cardWidth, setCardWidth] = useState(280);
  const [hydrated] = useState(true);

  const rotateArray = (arr: typeof list, k: number) => {
    const len = arr.length;
    const n = ((k % len) + len) % len;
    return [...arr.slice(n), ...arr.slice(0, n)];
  };

  useLayoutEffect(() => {
    const update = () => {
      const containerWidth =
        containerRef.current?.offsetWidth || window.innerWidth || 0;
      const w = window.innerWidth || 0;

      let count: number;
      let cw: number;

      if (w <= 425) {
        count = 1;
        cw = Math.min(480, containerWidth - 32);
      } else if (w < 1024) {
        count = 2;
        cw = Math.floor((containerWidth - GAP * (count - 1)) / count);
        cw = Math.max(280, Math.min(340, cw));
      } else {
        count = 3;
        cw = Math.floor((containerWidth - GAP * (count - 1)) / count);
        cw = Math.max(280, Math.min(380, cw));
      }

      setCardWidth(cw);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [items.length]);

  const CENTER = Math.floor(list.length / 2);
  const displayCount = 3;
  const leftCount = Math.floor(displayCount / 2);
  const start = Math.max(0, CENTER - leftCount);
  const end = Math.min(list.length, start + displayCount);
  const visibleItems = list.slice(start, end);

  // Grid style width
  // Kita tidak lagi menggunakan width statis di UL, tapi biarkan flexbox mengatur
  // atau kita gunakan logic CSS grid/flex

  if (!hydrated) {
    return (
      <div ref={containerRef} className="relative mx-auto mt-6 w-full pb-10" />
    );
  }

  return (
    <div ref={containerRef} className="relative mx-auto mt-6 w-full pb-10">
      <ul
        ref={listRef}
        className="mx-auto flex items-stretch justify-center gap-6 px-1 transition-all duration-300 ease-out [perspective:none] lg:[perspective:800px]"
        aria-live="polite"
      >
        {visibleItems.map((c, idx) => {
          // Logic rotasi 3D
          const visualCenter = Math.floor(visibleItems.length / 2);
          const offset = idx - visualCenter;
          const rotateY = Math.max(-20, Math.min(20, -offset * 12));
          const scale = idx === visualCenter ? 1 : 0.92;

          // Pure CSS Visibility Logic
          // Index 0: Hidden on Mobile (<425px) & Tablet (<1024px) if we want centered item
          // Tapi tunggu, jika 1 item (mobile), kita mau item tengah (index 1) yang tampil.
          // Index 0 & 2 harus hidden di mobile.
          // Jika 2 item (tablet), kita mau index 0 & 1 tampil, index 2 hidden.

          let visibilityClass = "block";
          if (idx === 0) {
            // Kiri: Hide di mobile (<640px) agar hanya tengah sisa
            visibilityClass = "hidden sm:block";
          } else if (idx === 1) {
            // Tengah: Selalu tampil
            visibilityClass = "block";
          } else if (idx === 2) {
            // Kanan: Hide di tablet (<1024px) dan mobile (<640px)
            visibilityClass = "hidden lg:block";
          }

          return (
            <li
              key={c.name}
              className={`bg-background/50 relative cursor-pointer overflow-hidden rounded-xl border border-white/10 transition-all duration-500 ${visibilityClass} transform-none [transform-style:flat] lg:[transform:var(--slide-transform)] lg:[transform-style:preserve-3d]`}
              style={
                {
                  width: cardWidth,
                  "--slide-transform": `rotateY(${rotateY}deg) scale(${scale})`,
                  transition: "transform 300ms ease",
                } as React.CSSProperties
              }
              onClick={() => {
                if (idx < visualCenter) {
                  setList(rotateArray(list, -1));
                } else if (idx > visualCenter) {
                  setList(rotateArray(list, 1));
                }
              }}
              aria-current={visualCenter === idx}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <h4 className="text-lg font-semibold">{c.name}</h4>
                <p className="subtle mt-1 text-sm">
                  {c.issuer} · {c.year}
                </p>
                <a
                  href={c.link}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-xs hover:border-white/20"
                >
                  <Link className="size-3" /> View Certificate
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex items-center justify-center gap-4">
        <ActionPill
          onClick={() =>
            setList((arr) => [arr[arr.length - 1], ...arr.slice(0, -1)])
          }
          ariaLabel="Previous"
          variant="accent"
        >
          Prev
        </ActionPill>
        {viewAllHref && (
          <ActionPill
            href={viewAllHref}
            ariaLabel={viewAllLabel ?? "View All Certificates"}
            variant="brand"
            icon={<Link className="size-3" />}
          >
            {viewAllLabel ?? "View All"}
          </ActionPill>
        )}
        <ActionPill
          onClick={() => setList((arr) => [...arr.slice(1), arr[0]])}
          ariaLabel="Next"
          variant="accent"
        >
          Next
        </ActionPill>
      </div>
    </div>
  );
}
