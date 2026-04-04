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
      <Heading level={2} className="mb-10">
        {about.title}
      </Heading>
        <div ref={refText} className={animText}>
          <p className="text-neutral-light text-base leading-relaxed mb-6">
            {about.story}
          </p>
          <p className="text-neutral-light text-base leading-relaxed mb-8">
            {about.philosophy}
          </p>
          <ul className="space-y-4">
            {about.trustBullets.map((bullet: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="text-lime mt-[3px] flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" />
                </svg>
                <span className="text-neutral-light text-sm">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
    </Section>
  );
}
