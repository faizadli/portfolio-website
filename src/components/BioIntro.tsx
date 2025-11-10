"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PixelTransition from "./PixelTransition";

export default function BioIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".bio-title, .bio-subtitle, .bio-points li", {
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="container py-8 sm:py-12">
      <div
        ref={containerRef}
        className="relative grid gap-6 sm:gap-8 md:grid-cols-[220px_1fr] items-center rounded-xl border border-white/10 bg-background/60 p-4 sm:p-6"
      >
        <div className="relative w-full max-w-[220px] aspect-square mx-auto sm:max-w-[200px] md:max-w-[220px]">
          <PixelTransition
            firstContent={
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" 
                alt="Profile"
                className="w-full h-full object-cover rounded-xl border border-white/10 shadow-sm"
              />
            }
            secondContent={
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop" 
                alt="Profile Alternative"
                className="w-full h-full object-cover rounded-xl border border-white/10 shadow-sm"
              />
            }
            gridSize={12}
            pixelColor="#222831"
            once={false}
            animationStepDuration={0.4}
            className="w-full h-auto"
          />
        </div>
        <div>
          <h2 className="bio-title text-2xl md:text-3xl font-semibold">Halo, saya Mochamad Faiz Adli</h2>
          <p className="bio-subtitle mt-2 text-foreground/80">
            Frontend engineer yang fokus pada UI interaktif, aksesibel, dan performa. Suka membangun
            pengalaman yang halus dengan GSAP dan micro-interactions.
          </p>
          <ul className="bio-points mt-6 space-y-2 text-sm text-foreground/80">
            <li>• Spesialis animasi UI/UX dan GSAP.</li>
            <li>• Penggemar clean code dan design systems.</li>
            <li>• Senang eksperimen dengan 3D dan motion.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}