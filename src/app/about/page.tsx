import Reveal from "@/components/Reveal";
import ParallaxHero from "@/components/ParallaxHero";
import TiltCard from "@/components/TiltCard";
import TextSplit from "@/components/TextSplit";
import Image from "next/image";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="container py-16 space-y-12">
      <ParallaxHero />

      <Reveal y={22}>
        <p className="max-w-3xl text-foreground/80 leading-relaxed">
          Saya Mochamad Faiz Adli, seorang pengembang front-end yang menyukai desain minimalis, aksesibilitas, dan animasi yang halus.
          Berpengalaman menggunakan Next.js, TypeScript, Tailwind, GSAP, dan integrasi API.
        </p>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Performance", icon: Zap, variant: "wave" as const },
          { label: "Aksesibilitas", icon: ShieldCheck, variant: "riseGlow" as const },
          { label: "Animasi", icon: Sparkles, variant: "flipIn" as const },
          { label: "Kolaborasi", icon: ShieldCheck, variant: "wave" as const },
        ].map((item, i) => (
          <Reveal key={item.label} y={24} delay={i * 0.08}>
            <TiltCard>
              <div className="flex items-center gap-2">
                <item.icon className="size-5 text-accent" />
                <TextSplit as="h3" text={item.label} className="text-lg font-semibold heading" variant={item.variant} mode="words" />
              </div>
              <p className="mt-2 text-sm subtle">Deskripsi singkat keunggulan dan fokus utama.</p>
              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-brand to-accent" />
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-12">
        <TextSplit text="Galeri Inspirasi" className="text-2xl font-semibold text-glow-soft" variant="riseGlow" mode="words" />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "https://placehold.co/600x400/png?text=Inspiration+1",
            "https://placehold.co/600x400/png?text=Inspiration+2",
            "https://placehold.co/600x400/png?text=Inspiration+3",
          ].map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
              <Image
                src={src}
                alt={`Inspiration ${i + 1}`}
                width={600}
                height={400}
                className="object-cover w-full h-48 md:h-56 lg:h-64"
                priority={i === 0}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}