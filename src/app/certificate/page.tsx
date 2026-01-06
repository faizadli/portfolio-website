"use client";
import Reveal from "@/components/Reveal";
import TextSplit from "@/components/TextSplit";
import Image from "next/image";
import { Link } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useLayoutEffect } from "react";

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
  {
    name: "JavaScript Fundamentals",
    issuer: "freeCodeCamp",
    year: 2022,
    image: "https://placehold.co/600x400/png?text=JavaScript+Fundamentals",
    link: "#",
  },
  {
    name: "TypeScript Essentials",
    issuer: "Udemy",
    year: 2023,
    image: "https://placehold.co/600x400/png?text=TypeScript+Essentials",
    link: "#",
  },
  {
    name: "React Testing",
    issuer: "Testing Library",
    year: 2024,
    image: "https://placehold.co/600x400/png?text=React+Testing",
    link: "#",
  },
  {
    name: "Node.js Basics",
    issuer: "Coursera",
    year: 2022,
    image: "https://placehold.co/600x400/png?text=Node.js+Basics",
    link: "#",
  },
  {
    name: "CSS Mastery",
    issuer: "Udacity",
    year: 2023,
    image: "https://placehold.co/600x400/png?text=CSS+Mastery",
    link: "#",
  },
  {
    name: "Accessibility Advanced",
    issuer: "Deque",
    year: 2024,
    image: "https://placehold.co/600x400/png?text=Accessibility+Advanced",
    link: "#",
  },
  {
    name: "Performance Web",
    issuer: "Google",
    year: 2024,
    image: "https://placehold.co/600x400/png?text=Performance+Web",
    link: "#",
  },
];

function CertificateContent() {
  const [pageSize, setPageSize] = useState(10);

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
    <section className="container mx-auto py-16">
      <Reveal y={28}>
        <TextSplit
          as="h2"
          text="Certificate"
          className="heading text-glow-soft text-4xl"
          variant="riseGlow"
          mode="words"
        />
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <div key={c.name}>
            <div className="group bg-card border-border hover:bg-brand/10 overflow-hidden rounded-xl border transition-colors hover:border-white/20">
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
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="subtle mt-1 text-sm">
                  {c.issuer} · {c.year}
                </p>
                <div className="mt-4">
                  <a
                    href={c.link}
                    className="border-accent/30 bg-accent/15 text-foreground hover:bg-accent/25 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5"
                  >
                    <Link className="size-3" /> View Certificate
                  </a>
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
