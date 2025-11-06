"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // 0-1
};

export default function TiltCard({ children, className = "", intensity = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elCurrent = ref.current;
    const innerCurrent = innerRef.current;
    if (!elCurrent || !innerCurrent) return;
    const el = elCurrent;
    const inner = innerCurrent;

    const qx = gsap.quickTo(inner, "rotateX", { duration: 0.3, ease: "power3.out" });
    const qy = gsap.quickTo(inner, "rotateY", { duration: 0.3, ease: "power3.out" });
    const qz = gsap.quickTo(inner, "rotateZ", { duration: 0.3, ease: "power3.out" });
    const qsh = gsap.quickSetter(inner, "boxShadow");

    function onMove(e: MouseEvent) {
      const r = el.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      const nx = (cx / r.width) * 2 - 1; // -1..1
      const ny = (cy / r.height) * 2 - 1;
      const rx = -ny * 10 * intensity;
      const ry = nx * 12 * intensity;
      qx(rx);
      qy(ry);
      qz(nx * ny * 2 * intensity);
      qsh(`${-ry * 1.5}px ${rx * 1.5}px 24px rgba(139,92,246,0.25)`);
    }

    function onLeave() {
      qx(0); qy(0); qz(0); qsh(`0 0 0 rgba(0,0,0,0)`);
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={`group perspective-1000 ${className}`}
      style={{ perspective: 1000 }}
    >
      <div
        ref={innerRef}
        className="rounded-xl border border-white/10 bg-background/50 p-6 will-change-transform transition-colors group-hover:border-white/20"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}