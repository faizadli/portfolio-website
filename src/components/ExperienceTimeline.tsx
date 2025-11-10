"use client";
import Reveal from "@/components/Reveal";
import TextSplit from "@/components/TextSplit";
import { Briefcase, Star, Code } from "lucide-react";

const timeline = [
  { icon: Briefcase, role: "Frontend Developer", org: "Company A", period: "Jan 14", details: "Membangun UI modular dan performa tinggi." },
  { icon: Code, role: "UI Engineer", org: "Startup B", period: "Jan 18", details: "Merancang sistem desain dan animasi micro-interactions." },
  { icon: Star, role: "Open Source", org: "GitHub", period: "Jan 24", details: "Kontribusi pada library animasi dan komponen UI." },
];

export default function ExperienceTimeline() {
  return (
    <section className="container py-16">
      <Reveal y={28}><TextSplit as="h2" text="Experience" className="heading text-4xl text-center" variant="wave" mode="words" /></Reveal>

      <div className="relative mx-auto mt-12 max-w-5xl">
        {/* Vertical line (left on mobile, center on md+) */}
        <div className="pointer-events-none absolute left-6 md:left-1/2 top-0 md:-translate-x-1/2 h-full w-[2px] bg-white/10" />

        <ul className="space-y-16">
          {timeline.map((t, i) => {
            const Icon = t.icon;
            const isLeft = i % 2 === 0;
            return (
              <li key={t.role} className="relative">
                {/* Marker */}
                <div className="absolute left-6 md:left-1/2 top-0 translate-x-0 md:-translate-x-1/2 -translate-y-1/2">
                  <div className="relative size-11 rounded-full border border-white/10 bg-background">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand/30 to-accent/30 blur-sm" />
                    <div className="relative m-1 grid size-9 place-items-center rounded-full bg-background border border-white/10">
                      <Icon className="size-5 text-accent" />
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className={`pl-16 md:pl-0 grid md:grid-cols-2 ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
                  <div className={`${isLeft ? "md:col-start-1" : "md:col-start-2"}`}>
                    <Reveal y={24} delay={i * 0.08}>
                      <article className="rounded-xl border border-white/10 bg-background/60 p-6 shadow-sm hover:border-white/20 transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold">{t.role} · {t.org}</h3>
                          <span className="ml-3 shrink-0 rounded-full border border-white/10 bg-background/50 px-2.5 py-1 text-xs subtle">{t.period}</span>
                        </div>
                        <p className="mt-3 text-sm text-foreground/80">{t.details}</p>
                        <div className="mt-4">
                          <a href="#" className="inline-flex items-center gap-2 text-xs rounded-full border border-white/10 px-3 py-1.5 hover:border-white/20">Read more</a>
                        </div>
                      </article>
                    </Reveal>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}