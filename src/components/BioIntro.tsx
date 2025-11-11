"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PixelTransition from "./PixelTransition";
import Image from "next/image";

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
              <Image
                src="/assets/profile/profile-1.jpeg"
                alt="Personal photo"
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 220px"
                className="object-cover rounded-xl border border-white/10 shadow-sm"
                priority
              />
            }
            secondContent={
              <Image
                src="/assets/profile/profile-2.jpeg"
                alt="Personal photo alternative"
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 220px"
                className="object-cover rounded-xl border border-white/10 shadow-sm"
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
          <h2 className="bio-title text-2xl md:text-3xl font-semibold">Halo, I'm Mochammad Faiz Adli</h2>
          <p className="bio-subtitle mt-2 text-foreground/80">
            I am a Fullstack Developer with experience in building complete web applications from front-end to back-end. I am passionate about delivering scalable, efficient, and user-oriented solutions through continuous learning and collaboration.
          </p>
        </div>
      </div>
    </section>
  );
}