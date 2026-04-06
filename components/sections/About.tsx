"use client";

import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { landingContent } from "@/content/landing-page";
import { useInView } from "@/lib/useInView";

export default function About() {
  const { about } = landingContent;
  const { ref: refText, animationClasses: animText } = useInView({ threshold: 0.15, direction: "up" });

  return (
    <Section id="about" eyebrow={about.eyebrow} dark>
      <div ref={refText} className={animText}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-start">
          <div>
            <p className="text-lime text-sm font-semibold tracking-[0.15em] mb-2">
              {about.coachName}
            </p>
            <Heading level={2} className="mb-6">
              {about.title}
            </Heading>
            <p className="text-neutral-light text-base leading-relaxed mb-6 max-w-2xl">
              {about.story}
            </p>
            <p className="text-neutral-light text-base leading-relaxed max-w-2xl">
              {about.philosophy}
            </p>
          </div>

          <div className="border border-emerald/50 bg-forest-deep p-6">
            <p className="text-lime text-xs font-semibold tracking-[0.18em] mb-5">
              لماذا يثق اللاعبون في هذا التدريب
            </p>
            <ul className="grid gap-3">
              {about.trustBullets.map((bullet: string, i: number) => (
                <li
                  key={i}
                  className="border border-emerald/40 bg-forest px-4 py-4 text-sm text-neutral-light"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
