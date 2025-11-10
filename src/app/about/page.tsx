import TextSplit from "@/components/TextSplit";
import InfiniteLogoLoop from "@/components/InfiniteLogoLoop";
import BioIntro from "@/components/BioIntro";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export default function AboutPage() {
  return (
    <section className="container py-16 space-y-16">
      {/* Section 1: Biodata Perkenalan */}
      <BioIntro />

      {/* Section 2: Timeline Experience */}
      <ExperienceTimeline />

      {/* Section 3: Tech Stack */}
      <div className="space-y-3">
        <TextSplit
          as="h2"
          text={`Tech Stack`}
          className="text-xl font-semibold text-center"
          variant="flipIn"
          mode="words"
        />
        <InfiniteLogoLoop />
      </div>
    </section>
  );
}