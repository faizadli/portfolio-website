"use client";
import Reveal from "@/components/Reveal";
import TextSplit from "@/components/TextSplit";

import { projectsData } from "@/lib/projects";
import ThreeDSlider from "@/components/ThreeDSlider";
import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import VariableProximity from "@/components/VariableProximity";
import InfiniteLogoLoop from "@/components/InfiniteLogoLoop";
import { gsap } from "@/lib/gsap";
import { ExternalLink, Tags } from "lucide-react";
import { Link } from "lucide-react";
import ActionPill from "@/components/ActionPill";
import DetailModal from "@/components/DetailModal";
import { certificatesData } from "@/lib/certificates";

// Dynamic import untuk Lanyard agar tidak di-render di server-side
const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState(3);
  const [homeProjectsPage, setHomeProjectsPage] = useState(1);
  const [openProj, setOpenProj] = useState(false);
  const [selectedProj, setSelectedProj] = useState<{
    title: string;
    image: string;
    desc: string;
    tags: string[];
  } | null>(null);
  const [openCert, setOpenCert] = useState(false);
  const [selectedCert, setSelectedCert] = useState<{
    name: string;
    issuer: string;
    year: number;
    image: string;
    description?: string;
  } | null>(null);
  const totalProjects = projectsData.length;
  const totalProjectPages = Math.max(1, Math.ceil(totalProjects / pageSize));
  const displayPage = Math.min(
    Math.max(1, homeProjectsPage),
    totalProjectPages,
  );
  const startIdx = (displayPage - 1) * pageSize;
  const homeVisibleProjects = projectsData.slice(startIdx, startIdx + pageSize);
  const ClampedDesc = ({ text }: { text: string }) => {
    return <p className="text-foreground/80 mt-2 truncate text-sm">{text}</p>;
  };

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
  useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth || 0;
      const size = w < 640 ? 1 : w < 1024 ? 2 : 3;
      setPageSize(size);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return (
    <section className="container">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <div
            ref={containerRef}
            style={{ position: "relative", display: "inline-block" }}
          >
            <Reveal y={32}>
              <VariableProximity
                label="Hi, I'm Faiz Adli."
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

      <section className="full-bleed bg-brand mt-20">
        <div className="on-brand container py-16 md:py-24">
          <Reveal y={28}>
            <TextSplit
              as="h2"
              text="Projects"
              className="heading text-center text-4xl text-black md:text-5xl"
              variant="flipIn"
              mode="words"
            />
          </Reveal>
          <Reveal y={24} delay={0.1}>
            <div className="on-card mt-8">
              <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {homeVisibleProjects.map((p, i) => (
                  <Reveal
                    key={p.title}
                    y={20}
                    delay={i * 0.06}
                    className={
                      i === 1
                        ? "hidden sm:block"
                        : i === 2
                          ? "hidden lg:block"
                          : "block"
                    }
                  >
                    <article className="group border-border bg-card flex h-full w-full max-w-full flex-col overflow-hidden rounded-xl border transition-colors">
                      <div className="relative h-32 w-full sm:h-40 md:h-48">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                        />
                      </div>
                      <div className="flex flex-col px-5 pt-5 pb-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold">{p.title}</h3>
                          </div>
                          <a
                            href={p.url}
                            aria-label={`Open ${p.title}`}
                            className="opacity-75 transition-transform hover:-translate-y-0.5 hover:opacity-100"
                          >
                            <ExternalLink className="size-4" />
                          </a>
                        </div>
                        <ClampedDesc text={p.desc} />
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="border-accent/30 bg-accent/15 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs">
                            <Tags className="size-3" /> Tags
                          </span>
                          {p.tags
                            .filter((t) => t !== "Next.js" && t !== "GSAP")
                            .map((t) => (
                              <span
                                key={t}
                                className="border-accent/30 bg-accent/15 text-foreground rounded-full border px-2 py-1 text-xs"
                              >
                                {t}
                              </span>
                            ))}
                        </div>
                        <div className="mt-3">
                          <button
                            onClick={() => {
                              setSelectedProj({
                                title: p.title,
                                image: p.image,
                                desc: p.desc,
                                tags: p.tags,
                              });
                              setOpenProj(true);
                            }}
                            className="rounded-full border border-white/10 px-3 py-1.5 text-xs hover:border-white/20"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-center gap-4">
                <ActionPill
                  onClick={() =>
                    setHomeProjectsPage((p) => {
                      const cur = Math.min(Math.max(1, p), totalProjectPages);
                      return cur > 1 ? cur - 1 : totalProjectPages;
                    })
                  }
                  ariaLabel="Previous"
                  variant="accent"
                  className="border-black/30 !text-black hover:border-black/40"
                >
                  Prev
                </ActionPill>
                <ActionPill
                  href="/projects"
                  ariaLabel="View All Projects"
                  variant="brand"
                  icon={<Link className="size-3" />}
                  className="border-2 border-black/70 bg-black/10 !text-black outline outline-1 outline-black/50 hover:bg-black/15"
                >
                  View All
                </ActionPill>
                <ActionPill
                  onClick={() =>
                    setHomeProjectsPage((p) => {
                      const cur = Math.min(Math.max(1, p), totalProjectPages);
                      return cur < totalProjectPages ? cur + 1 : 1;
                    })
                  }
                  ariaLabel="Next"
                  variant="accent"
                  className="border-black/30 !text-black hover:border-black/40"
                >
                  Next
                </ActionPill>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mt-20">
        <Reveal y={28}>
          <TextSplit
            as="h2"
            text="Certificates"
            className="heading text-center text-4xl md:text-5xl"
            variant="flipIn"
            mode="words"
          />
        </Reveal>
        <Reveal y={24} delay={0.1}>
          <div className="mt-6 md:mt-8">
            <ThreeDSlider
              items={certificatesData}
              viewAllHref="/certificate"
              viewAllLabel="View All"
              onView={(item) => {
                setSelectedCert(item);
                setOpenCert(true);
              }}
            />
          </div>
        </Reveal>
      </div>

      <section className="full-bleed bg-brand mt-20">
        <div className="on-brand container py-16 md:py-24">
          <Reveal y={28}>
            <TextSplit
              as="h2"
              text="Get In Touch"
              className="heading text-foreground text-center text-4xl md:text-5xl"
              variant="flipIn"
              mode="words"
            />
          </Reveal>
          <Reveal y={24} delay={0.1}>
            <div className="mx-auto mt-8 max-w-3xl text-center md:mt-10">
              <p className="text-foreground/80">
                Have a project in mind or want to collaborate? Let’s talk.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:mt-10">
                <a
                  href="/contact"
                  aria-label="Go to Contact page"
                  className="bg-primary-foreground/90 hover:bg-primary-foreground text-brand rounded-full px-5 py-2.5 transition-colors transition-transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  Contact Me
                </a>
                <a
                  href="/about"
                  aria-label="Learn more about me"
                  className="text-foreground hover:bg-accent/10 rounded-full border border-black/10 px-5 py-2.5 transition-transform hover:-translate-y-0.5 hover:border-black/20"
                >
                  Learn More
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <DetailModal
        open={openCert}
        onClose={() => setOpenCert(false)}
        image={selectedCert?.image}
        title={selectedCert?.name}
        subtitle={
          selectedCert
            ? `${selectedCert.issuer} - ${selectedCert.year}`
            : undefined
        }
        description={selectedCert?.description}
      />
      <DetailModal
        open={openProj}
        onClose={() => setOpenProj(false)}
        image={selectedProj?.image}
        title={selectedProj?.title}
        tags={selectedProj?.tags}
        description={selectedProj?.desc}
      />
    </section>
  );
}
