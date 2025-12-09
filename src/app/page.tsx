"use client";
import Reveal from "@/components/Reveal";
import TextSplit from "@/components/TextSplit";
import ExpandableShowcase, {
  ShowcaseItem,
} from "@/components/ExpandableShowcase";
import { projectsData } from "@/lib/projects";
import ThreeDSlider from "@/components/ThreeDSlider";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import VariableProximity from "@/components/VariableProximity";
import InfiniteLogoLoop from "@/components/InfiniteLogoLoop";
import { gsap } from "@/lib/gsap";

// Dynamic import untuk Lanyard agar tidak di-render di server-side
const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const nodes = Array.from(
        el.querySelectorAll<HTMLSpanElement>(".stat-value"),
      );
      nodes.forEach((node) => {
        const target = Number(node.dataset.target || 0);
        const suffix = node.dataset.suffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            node.textContent = `${Math.floor(obj.val)}${suffix}`;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="container pb-24 md:pb-32">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <div
            ref={containerRef}
            style={{ position: "relative", display: "inline-block" }}
          >
            <Reveal y={32}>
              <VariableProximity
                label="Hi, I'm Faiz."
                className="heading text-foreground cursor-pointer text-5xl md:text-6xl"
                fromFontVariationSettings="'wght' 300, 'opsz' 12"
                toFontVariationSettings="'wght' 900, 'opsz' 48"
                containerRef={containerRef}
                radius={200}
                falloff="exponential"
              />
            </Reveal>
          </div>
          <Reveal y={24} delay={0.15}>
            <p className="text-foreground/80 mt-6 text-lg leading-relaxed">
              I am a Fullstack Developer with experience in building complete
              web applications from front-end to back-end. I am passionate about
              delivering scalable, efficient, and user-oriented solutions
              through continuous learning and collaboration.
            </p>
          </Reveal>
          <Reveal y={20} delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/projects"
                className="bg-brand/90 hover:bg-brand rounded-full px-5 py-2.5 text-black transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-md"
              >
                View Projects
              </a>
              <a
                href="/contact"
                className="text-foreground hover:bg-accent/10 rounded-full border border-white/10 px-5 py-2.5 transition-transform hover:-translate-y-0.5 hover:border-white/20"
              >
                Contact Me
              </a>
            </div>
          </Reveal>
        </div>
        {/* Lanyard - fixed height container */}
        <div className="relative h-[500px] w-full md:h-[600px]">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            fov={25}
            transparent={true}
          />
        </div>
      </div>

      {/* Stats ringkas */}
      <Reveal y={24}>
        <div
          ref={statsRef}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { label: "Projects", value: 12, suffix: "+" },
            { label: "Years", value: 4, suffix: "+" },
            { label: "Tech Stack", value: 18, suffix: "" },
            { label: "Certificates", value: 5, suffix: "" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-card border-border rounded-xl border p-4 text-center"
            >
              <span
                className="text-brand stat-value text-3xl font-semibold"
                data-target={s.value}
                data-suffix={s.suffix}
              >
                0
              </span>
              <div className="text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Logo marquee */}
      <Reveal y={24} delay={0.1}>
        <section className="mt-12">
          <InfiniteLogoLoop />
        </section>
      </Reveal>

      {/* Projects (Showcase Slider) */}
      <Reveal y={28}>
        <TextSplit
          as="h2"
          text="Projects"
          className="heading mt-16 text-center text-3xl"
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
        <TextSplit
          as="h2"
          text="Certificates"
          className="heading mt-16 text-center text-3xl"
          variant="flipIn"
          mode="words"
        />
      </Reveal>
      <Reveal y={24} delay={0.1}>
        <div className="mt-2">
          {(() => {
            const certificates = [
              {
                name: "Front-End Developer",
                issuer: "Dicoding",
                year: 2023,
                image:
                  "https://placehold.co/600x400/png?text=Front-End+Developer",
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
                image:
                  "https://placehold.co/600x400/png?text=Web+Accessibility",
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
                image:
                  "https://placehold.co/600x400/png?text=Performance+Optimization",
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

      {/* Contact CTA */}
      <Reveal y={28}>
        <TextSplit
          as="h2"
          text="Get In Touch"
          className="heading mt-16 text-center text-3xl"
          variant="flipIn"
          mode="words"
        />
      </Reveal>
      <Reveal y={24} delay={0.1}>
        <div className="mx-auto mt-6 max-w-2xl text-center">
          <p className="text-foreground/80">
            Have a project in mind or want to collaborate? Let’s talk.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="/contact"
              aria-label="Go to Contact page"
              className="bg-brand/90 hover:bg-brand rounded-full px-5 py-2.5 text-black transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-md"
            >
              Contact Me
            </a>
            <a
              href="/about"
              aria-label="Learn more about me"
              className="text-foreground hover:bg-accent/10 rounded-full border border-white/10 px-5 py-2.5 transition-transform hover:-translate-y-0.5 hover:border-white/20"
            >
              Learn More
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
