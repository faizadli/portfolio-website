"use client";
import Reveal from "@/components/Reveal";
import TextSplit from "@/components/TextSplit";
import Image from "next/image";
import { ExternalLink, Tags } from "lucide-react";
import { projectsData } from "@/lib/projects";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useLayoutEffect } from "react";
import DetailModal from "@/components/DetailModal";

function ProjectsContent() {
  const [pageSize, setPageSize] = useState(10);
  const [openProj, setOpenProj] = useState(false);
  const [selectedProj, setSelectedProj] = useState<{
    title: string;
    image: string;
    desc: string;
    tags: string[];
  } | null>(null);

  useLayoutEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      // Tablet range: >= 640px (sm) and < 1024px (lg)
      if (w >= 640 && w < 1024) {
        setPageSize(10);
      } else {
        setPageSize(9);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();
  const raw = searchParams.get("page");
  const parsed = raw ? Number(raw) : 1;
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  const totalItems = projectsData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const startIndex = (clampedPage - 1) * pageSize;
  const visible = projectsData.slice(startIndex, startIndex + pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const setPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    router.push(`/projects?page=${next}`);
  };

  return (
    <section className="container">
      <Reveal y={28}>
        <TextSplit
          as="h2"
          text="Projects"
          className="heading text-glow-soft text-4xl"
          variant="flipIn"
          mode="words"
        />
      </Reveal>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.title} y={24} delay={i * 0.08}>
            <article className="group border-border bg-card flex h-full w-full max-w-full flex-col overflow-hidden rounded-xl border transition-colors">
              <div className="relative h-36 w-full sm:h-44 md:h-52 lg:h-56">
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
                <p className="text-foreground/80 mt-2 truncate text-sm">
                  {p.desc}
                </p>
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
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5 hover:border-white/20"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => setPage(clampedPage - 1)}
          disabled={clampedPage <= 1}
          aria-disabled={clampedPage <= 1}
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5 hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>
        <span className="subtle text-xs">
          Page {clampedPage} of {totalPages}
        </span>
        <button
          onClick={() => setPage(clampedPage + 1)}
          disabled={clampedPage >= totalPages}
          aria-disabled={clampedPage >= totalPages}
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5 hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {pages.map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            aria-current={n === clampedPage ? "page" : undefined}
            className={
              `rounded-full border px-3 py-1.5 text-xs transition-colors ` +
              (n === clampedPage
                ? "border-brand bg-brand/90 hover:bg-brand text-black"
                : "text-foreground border-white/10 bg-white/5 hover:bg-white/10")
            }
          >
            {n}
          </button>
        ))}
      </div>
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

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <section className="container py-16">
          <p className="subtle">Loading projects…</p>
        </section>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
