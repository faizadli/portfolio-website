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
        className="bg-background/60 relative grid items-center gap-6 rounded-xl border border-white/10 p-4 sm:gap-8 sm:p-6 md:grid-cols-[220px_1fr]"
      >
        <div className="relative mx-auto aspect-square w-full max-w-[220px] sm:max-w-[200px] md:max-w-[220px]">
          <PixelTransition
            firstContent={
              <Image
                src="/assets/profile/profile-1.jpeg"
                alt="Personal photo"
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 220px"
                className="rounded-xl border border-white/10 object-cover shadow-sm"
                priority
              />
            }
            secondContent={
              <Image
                src="/assets/profile/profile-2.jpeg"
                alt="Personal photo alternative"
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 220px"
                className="rounded-xl border border-white/10 object-cover shadow-sm"
              />
            }
            gridSize={12}
            pixelColor="#222831"
            once={false}
            animationStepDuration={0.4}
            className="h-auto w-full"
          />
        </div>
        <div>
          <h2 className="bio-title text-2xl font-semibold md:text-3xl">
            Halo, I&apos;m Mochammad Faiz Adli
          </h2>
          <p className="bio-subtitle text-foreground/80 mt-2">
            I am a Fullstack Developer with experience in building complete web
            applications from front-end to back-end. I am passionate about
            delivering scalable, efficient, and user-oriented solutions through
            continuous learning and collaboration.
          </p>
        </div>
      </div>
    </section>
  );
}
