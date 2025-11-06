"use client";
import Reveal from "@/components/Reveal";
import TextSplit from "@/components/TextSplit";
import Image from "next/image";
import { Link } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

const certificates = [
  { name: "Front-End Developer", issuer: "Dicoding", year: 2023, image: "https://placehold.co/600x400/png?text=Front-End+Developer", link: "#" },
  { name: "React Advanced", issuer: "Udemy", year: 2024, image: "https://placehold.co/600x400/png?text=React+Advanced", link: "#" },
  { name: "Web Accessibility", issuer: "Coursera", year: 2024, image: "https://placehold.co/600x400/png?text=Web+Accessibility", link: "#" },
  { name: "UI Design Basics", issuer: "Coursera", year: 2023, image: "https://placehold.co/600x400/png?text=UI+Design+Basics", link: "#" },
  { name: "Performance Optimization", issuer: "Udacity", year: 2024, image: "https://placehold.co/600x400/png?text=Performance+Optimization", link: "#" },
  { name: "JavaScript Fundamentals", issuer: "freeCodeCamp", year: 2022, image: "https://placehold.co/600x400/png?text=JavaScript+Fundamentals", link: "#" },
  { name: "TypeScript Essentials", issuer: "Udemy", year: 2023, image: "https://placehold.co/600x400/png?text=TypeScript+Essentials", link: "#" },
  { name: "React Testing", issuer: "Testing Library", year: 2024, image: "https://placehold.co/600x400/png?text=React+Testing", link: "#" },
  { name: "Node.js Basics", issuer: "Coursera", year: 2022, image: "https://placehold.co/600x400/png?text=Node.js+Basics", link: "#" },
  { name: "CSS Mastery", issuer: "Udacity", year: 2023, image: "https://placehold.co/600x400/png?text=CSS+Mastery", link: "#" },
  { name: "Accessibility Advanced", issuer: "Deque", year: 2024, image: "https://placehold.co/600x400/png?text=Accessibility+Advanced", link: "#" },
  { name: "Performance Web", issuer: "Google", year: 2024, image: "https://placehold.co/600x400/png?text=Performance+Web", link: "#" },
];

export default function CertificatePage() {
  const PAGE_SIZE = 9;
  const searchParams = useSearchParams();
  const router = useRouter();
  const raw = searchParams.get("page");
  const parsed = raw ? Number(raw) : 1;
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  const totalItems = certificates.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const startIndex = (clampedPage - 1) * PAGE_SIZE;
  const visible = certificates.slice(startIndex, startIndex + PAGE_SIZE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const setPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    router.push(`/certificate?page=${next}`);
  };

  return (
    <section className="container mx-auto py-16">
      <Reveal y={28}><TextSplit as="h2" text="Certificate" className="heading text-4xl" variant="riseGlow" mode="words" /></Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c, i) => (
          <Reveal key={c.name} y={24} delay={i * 0.08}>
            <div className="group rounded-xl border border-white/10 bg-background/40 overflow-hidden hover:border-white/20 transition-colors">
              <div className="relative h-36 w-full">
                <Image src={c.image} alt={c.name} fill className="object-cover" unoptimized />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm subtle">{c.issuer} · {c.year}</p>
                <div className="mt-4">
                  <a href={c.link} className="inline-flex items-center gap-2 text-xs rounded-full border border-white/10 px-3 py-1.5 hover:border-white/20">
                    <Link className="size-3" /> View Certificate
                  </a>
                </div>
              </div>
            </div>
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