"use client";
import Reveal from "@/components/Reveal";
import TextSplit from "@/components/TextSplit";
import ExpandableShowcase, { ShowcaseItem } from "@/components/ExpandableShowcase";
import { projectsData } from "@/data/projects";
import ThreeDSlider from "@/components/ThreeDSlider";
import dynamic from "next/dynamic";
import { useRef } from "react";
import VariableProximity from "@/components/VariableProximity";

// Dynamic import untuk Lanyard agar tidak di-render di server-side
const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="container">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
            <Reveal y={32}>
              <VariableProximity
              label="Hi, I'm Faiz."
              className="heading text-5xl md:text-6xl text-foreground cursor-pointer"
              fromFontVariationSettings="'wght' 300, 'opsz' 12"
              toFontVariationSettings="'wght' 900, 'opsz' 48"
              containerRef={containerRef}
              radius={200}
              falloff="exponential"
            />
            </Reveal>
          </div>
          <Reveal y={24} delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Frontend Developer fokus pada pengalaman pengguna, desain elegan, dan animasi halus.
              Portfolio ini dibangun dengan Next.js, TypeScript, Tailwind, dan GSAP.
            </p>
          </Reveal>
          <Reveal y={20} delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/projects"
                className="px-5 py-2.5 rounded-full bg-brand/90 text-black hover:bg-brand transition-colors"
              >
                Lihat Projects
              </a>
              <a
                href="/contact"
                className="px-5 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-foreground"
              >
                Hubungi Saya
              </a>
            </div>
          </Reveal>
        </div>
        {/* Lanyard - fixed height container */}
        <div className="relative w-full h-[500px] md:h-[600px]">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={25} transparent={true} />
        </div>
      </div>

      {/* Projects (Showcase Slider) */}
      <Reveal y={28}>
        <TextSplit
          as="h2"
          text="Projects"
          className="heading mt-16 text-3xl text-center"
          variant="flipIn"
          mode="words"
        />
      </Reveal>
      <Reveal y={24} delay={0.1}>
        <div className="mt-2">
          <ExpandableShowcase
            items={projectsData.slice(0, 4) as ShowcaseItem[]}
            viewAllHref="/projects"
            viewAllLabel="View All"
          />
        </div>
      </Reveal>

      {/* Certificates */}
      <Reveal y={28}>
        <h2 className="heading mt-16 text-3xl text-center">Certificates</h2>
      </Reveal>
      <Reveal y={24} delay={0.1}>
        <div className="mt-2">
          {(() => {
            const certificates = [
              {
                name: "Front-End Developer",
                issuer: "Dicoding",
                year: 2023,
                image: "https://placehold.co/600x400/png?text=Front-End+Developer",
                link: "#",
              },
              {
                name: "React Advanced",
                issuer: "Udemy",
                year: 2024,
                image: "https://placehold.co/600x400/png?text=React+Advanced",
                link: "#",
              },
              {
                name: "Web Accessibility",
                issuer: "Coursera",
                year: 2024,
                image: "https://placehold.co/600x400/png?text=Web+Accessibility",
                link: "#",
              },
              {
                name: "UI Design Basics",
                issuer: "Coursera",
                year: 2023,
                image: "https://placehold.co/600x400/png?text=UI+Design+Basics",
                link: "#",
              },
              {
                name: "Performance Optimization",
                issuer: "Udacity",
                year: 2024,
                image: "https://placehold.co/600x400/png?text=Performance+Optimization",
                link: "#",
              },
            ];
            return (
              <ThreeDSlider
                items={certificates}
                viewAllHref="/certificate"
                viewAllLabel="View All"
              />
            );
          })()}
        </div>
      </Reveal>
    </section>
  );
}