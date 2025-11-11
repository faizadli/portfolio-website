"use client";
import Reveal from "@/components/Reveal";
import TextSplit from "@/components/TextSplit";
import { Briefcase } from "lucide-react";

const timeline = [
  {
    icon: Briefcase,
    company: "PT. Aneka Search Indonesia (Peepl)",
    field: "Fullstack Developer",
    type: "Contract",
    start: "October 2025",
    end: "Present",
  },
  {
    icon: Briefcase,
    company: "PT. Aneka Search Indonesia (Peepl)",
    field: "IT Programmer",
    type: "Internship",
    start: "July 2025",
    end: "October 2025",
  },
  {
    icon: Briefcase,
    company: "PT. Kodeintekno Cipta Solusi",
    field: "Fullstack Developer",
    type: "Freelance",
    start: "October 2024",
    end: "August 2025",
  },
  {
    icon: Briefcase,
    company: "PT. Kimia Farma Diagnostika",
    field: "Web Developer",
    type: "Internship",
    start: "January 2022",
    end: "March 2022",
  },
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
              <li key={`${t.company}-${i}`} className="relative">
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
                        <h3 className="text-lg font-semibold">{t.company}</h3>
                        <div className="mt-3 space-y-1.5">
                          <p className="text-sm text-foreground/80">{t.field}</p>
                          <p className="text-sm text-foreground/80">{t.type}</p>
                          <p className="text-sm text-foreground/80">{t.start} - {t.end}</p>
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