"use client";

import { useEffect, useRef } from "react";
import type { JSX } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  stagger?: number;
  y?: number;
  delay?: number;
  mode?: "chars" | "words";
  variant?: "wave" | "flipIn" | "riseGlow";
  shimmer?: boolean;
};

export default function TextSplit({
  text,
  className = "",
  as = "h2",
  stagger = 0.035,
  y = 24,
  delay = 0,
  mode = "chars",
  variant = "wave",
  shimmer = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = Array.from(
      el.querySelectorAll<HTMLElement>(mode === "words" ? ".word" : ".char")
    );
    const ctx = gsap.context(() => {
      // Base set
      if (variant === "wave") {
        gsap.set(targets, { opacity: 0, y, rotateZ: -6 });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          ease: "sine.out",
          duration: 0.8,
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      } else if (variant === "flipIn") {
        gsap.set(el, { transformStyle: "preserve-3d" });
        gsap.set(targets, {
          opacity: 0,
          y,
          rotateX: 90,
          transformOrigin: "50% 100%",
        });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          ease: "back.out(1.4)",
          duration: 0.75,
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      } else if (variant === "riseGlow") {
        gsap.set(targets, { opacity: 0, y, filter: "blur(6px)" });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 0.7,
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, el);
    return () => ctx.revert();
  }, [stagger, y, delay, variant, mode]);

  const Tag: any = as;
  return (
    <Tag
      ref={ref}
      className={shimmer ? `${className} text-shimmer` : className}
    >
      {mode === "words"
        ? text.split(/(\s+)/).map((token, i) => {
            const isSpace = /\s+/.test(token);
            if (isSpace) {
              return (
                <span key={`space-${i}`} className="inline-block">
                  {"\u00A0"}
                </span>
              );
            }
            return (
              <span key={`word-${i}`} className="word inline-block will-change-transform">
                {Array.from(token).map((c, j) => (
                  <span key={`char-${i}-${j}`} className="char inline-block will-change-transform">
                    {c}
                  </span>
                ))}
              </span>
            );
          })
        : Array.from(text).map((c, i) => (
            <span key={i} className="char inline-block will-change-transform">
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
    </Tag>
  );
}