"use client";
import Reveal from "@/components/Reveal";
import TextSplit from "@/components/TextSplit";
import { Link } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useLayoutEffect } from "react";
import DetailModal from "@/components/DetailModal";
import Image from "next/image";
import { certificatesData } from "@/lib/certificates";
import type { CertificateItem } from "@/lib/certificates";

const certificates = certificatesData;

function CertificateContent() {
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<CertificateItem | null>(null);

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
  const totalItems = certificates.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const startIndex = (clampedPage - 1) * pageSize;
  const visible = certificates.slice(startIndex, startIndex + pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const setPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    router.push(`/certificate?page=${next}`);
  };

  return (
    <section className="container">
      <Reveal y={28}>
        <TextSplit
          as="h2"
          text="Certificate"
          className="heading text-glow-soft text-4xl"
          variant="riseGlow"
          mode="words"
        />
      </Reveal>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <div key={c.name}>
            <div className="group bg-card border-border hover:bg-brand/10 w-full max-w-full overflow-hidden rounded-xl border transition-colors hover:border-white/20">
              <div className="relative h-36 w-full">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  unoptimized
                />
                <div className="bg-brand/20 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h3 className="truncate text-lg font-semibold">{c.name}</h3>
                <p className="subtle mt-1 text-sm">
                  {c.issuer} · {c.year}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setSelected(c);
                      setOpen(true);
                    }}
                    className="border-accent/30 bg-accent/15 text-foreground hover:bg-accent/25 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5"
                  >
                    <Link className="size-3" /> View Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => setPage(clampedPage - 1)}
          disabled={clampedPage <= 1}
          aria-disabled={clampedPage <= 1}
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50"
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
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50"
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
        open={open}
        onClose={() => setOpen(false)}
        image={selected?.image}
        title={selected?.name}
        subtitle={
          selected ? `${selected.issuer} - ${selected.year}` : undefined
        }
        description={selected?.description ?? ""}
      />
    </section>
  );
}

export default function CertificatePage() {
  return (
    <Suspense
      fallback={
        <section className="container mx-auto py-16">
          <p className="subtle">Loading certificates…</p>
        </section>
      }
    >
      <CertificateContent />
    </Suspense>
  );
}
