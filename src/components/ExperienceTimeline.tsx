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
      <Reveal y={28}>
        <TextSplit
          as="h2"
          text="Experience"
          className="heading text-center text-4xl"
          variant="wave"
          mode="words"
        />
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-5xl">
        {/* Vertical line (left on mobile, center on md+) */}
        <div className="pointer-events-none absolute top-0 left-6 h-full w-[2px] bg-white/10 md:left-1/2 md:-translate-x-1/2" />

        <ul className="space-y-16">
          {timeline.map((t, i) => {
            const Icon = t.icon;
            const isLeft = i % 2 === 0;
            return (
              <li key={`${t.company}-${i}`} className="relative">
                {/* Marker */}
                <div className="absolute top-0 left-6 translate-x-0 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2">
                  <div className="bg-background relative size-11 rounded-full border border-white/10">
                    <div className="from-brand/30 to-accent/30 absolute inset-0 rounded-full bg-gradient-to-br blur-sm" />
                    <div className="bg-background relative m-1 grid size-9 place-items-center rounded-full border border-white/10">
                      <Icon className="text-accent size-5" />
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`grid pl-16 md:grid-cols-2 md:pl-0 ${isLeft ? "md:pr-10" : "md:pl-10"}`}
                >
                  <div
                    className={`${isLeft ? "md:col-start-1" : "md:col-start-2"}`}
                  >
                    <Reveal y={24} delay={i * 0.08}>
                      <article className="border-border bg-card hover:bg-accent/10 rounded-xl border p-6 shadow-sm transition-colors transition-transform hover:-translate-y-0.5 hover:border-white/20">
                        <h3 className="text-lg font-semibold">{t.company}</h3>
                        <div className="mt-3 space-y-1.5">
                          <p className="text-foreground/80 text-sm">
                            {t.field}
                          </p>
                          <p className="text-foreground/80 text-sm">{t.type}</p>
                          <p className="text-foreground/80 text-sm">
                            {t.start} - {t.end}
                          </p>
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
