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
      <Reveal y={28}>
        <TextSplit
          as="h2"
          text="Projects"
          className="heading text-glow-soft text-4xl"
          variant="flipIn"
          mode="words"
        />
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.title} y={24} delay={i * 0.08}>
            <article className="group border-border bg-card hover:bg-accent/10 overflow-hidden rounded-xl border transition-colors hover:border-white/20">
              <div className="relative h-40 w-full">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  unoptimized
                />
                <div className="bg-accent/20 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="group-hover:text-foreground text-lg font-semibold">
                      {p.title}
                    </h3>
                    <p className="subtle mt-1 text-xs">{p.stack}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.stack.split(",").map((s, i) =>
                        i < 2 ? (
                          <span
                            key={`${p.title}-stack-${i}`}
                            className="bg-brand/15 border-brand/30 text-foreground rounded-full border px-2 py-0.5 text-[11px]"
                          >
                            {s.trim()}
                          </span>
                        ) : null,
                      )}
                    </div>
                  </div>
                  <a
                    href={p.url}
                    aria-label={`Open ${p.title}`}
                    className="opacity-75 transition-transform hover:-translate-y-0.5 hover:opacity-100"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>
                <p className="text-foreground/80 mt-4 text-sm">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="border-accent/30 bg-accent/15 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs">
                    <Tags className="size-3" /> Tags
                  </span>
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border-accent/30 bg-accent/15 text-foreground rounded-full border px-2 py-1 text-xs"
                    >
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
