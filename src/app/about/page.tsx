import TextSplit from "@/components/TextSplit";
import InfiniteLogoLoop from "@/components/InfiniteLogoLoop";
import BioIntro from "@/components/BioIntro";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export default function AboutPage() {
  return (
    <section className="container space-y-16 py-16">
      {/* Section 1: Biodata Perkenalan */}
      <BioIntro />

      {/* Section 2: Timeline Experience */}
      <ExperienceTimeline />

      <div className="space-y-3">
        <TextSplit
          as="h2"
          text={`Tech Stack`}
          className="heading text-glow-soft text-center text-2xl"
          variant="flipIn"
          mode="words"
        />
        <InfiniteLogoLoop />
      </div>
    </section>
  );
}
