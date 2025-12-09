"use client";
import Reveal from "@/components/Reveal";
import TextSplit from "@/components/TextSplit";
import Image from "next/image";
import { ExternalLink, Tags } from "lucide-react";
import { projectsData } from "@/lib/projects";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function ProjectsContent() {
  const PAGE_SIZE = 9;
  const searchParams = useSearchParams();
  const router = useRouter();
  const raw = searchParams.get("page");
  const parsed = raw ? Number(raw) : 1;
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  const totalItems = projectsData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const startIndex = (clampedPage - 1) * PAGE_SIZE;
  const visible = projectsData.slice(startIndex, startIndex + PAGE_SIZE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const setPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    router.push(`/projects?page=${next}`);
  };

  return (
    <section className="container py-16">
      <Reveal y={28}><TextSplit as="h2" text="Projects" className="heading text-4xl" variant="flipIn" mode="words" /></Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.title} y={24} delay={i * 0.08}>
            <article className="group rounded-xl border border-white/10 bg-background/40 overflow-hidden hover:border-white/20 transition-colors">
              <div className="relative h-40 w-full">
                <Image src={p.image} alt={p.title} fill className="object-cover" unoptimized />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-foreground">{p.title}</h3>
                    <p className="mt-1 text-xs subtle">{p.stack}</p>
                  </div>
                  <a href={p.url} aria-label={`Open ${p.title}`} className="opacity-75 hover:opacity-100">
                    <ExternalLink className="size-4" />
                  </a>
                </div>
                <p className="mt-4 text-sm text-foreground/80">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-xs rounded-full border border-white/10 px-2 py-1">
                    <Tags className="size-3" /> Tags
                  </span>
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs rounded-full border border-white/10 px-2 py-1 bg-background/60">
                      {t}
                    </span>
                  ))}
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
          className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="text-xs subtle">Page {clampedPage} of {totalPages}</span>
        <button
          onClick={() => setPage(clampedPage + 1)}
          disabled={clampedPage >= totalPages}
          aria-disabled={clampedPage >= totalPages}
          className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
        {pages.map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            aria-current={n === clampedPage ? "page" : undefined}
            className={
              `px-3 py-1.5 rounded-full text-xs border transition-colors ` +
              (n === clampedPage
                ? "border-brand bg-brand/90 text-black hover:bg-brand"
                : "border-white/10 bg-white/5 hover:bg-white/10 text-foreground")
            }
          >
            {n}
          </button>
        ))}
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<section className="container py-16"><p className="subtle">Loading projects…</p></section>}>
      <ProjectsContent />
    </Suspense>
  );
}
