"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import TextSplit from "@/components/TextSplit";

export default function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-speed]"));
    const ctx = gsap.context(() => {
      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.speed || "0.5");
        gsap.to(layer, {
          y: () => -(ScrollTrigger.maxScroll(window) * speed * 0.05),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-white/10 bg-background/40">
      <div className="absolute inset-0 pointer-events-none">
        <div
          data-speed="0.4"
          className="layer absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-brand/30 to-transparent blur-2xl"
        />
        <div
          data-speed="0.6"
          className="layer absolute right-0 top-12 h-72 w-72 rounded-full bg-gradient-to-br from-accent/30 to-transparent blur-2xl"
        />
        <div
          data-speed="0.3"
          className="layer absolute left-1/2 bottom-0 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-400/10 to-transparent blur-3xl"
        />
      </div>
      <div className="relative z-10 px-8 py-16 md:px-12 md:py-20">
        <TextSplit
          as="h1"
          text="Tentang Saya"
          className="heading text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-brand to-accent"
        />
        <p className="mt-4 max-w-3xl text-foreground/80">
          Pengembang front-end yang mengejar pengalaman pengguna premium dengan tema gelap elegan dan animasi halus.
          Menyukai desain minimalis, aksesibilitas, dan interaksi yang bermakna.
        </p>
      </div>
    </div>
  );
}