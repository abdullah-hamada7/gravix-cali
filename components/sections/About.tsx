"use client";

import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { landingContent } from "@/content/landing-page";
import { useInView } from "@/lib/useInView";

export default function About() {
  const { about } = landingContent;
  const { ref: refText, animationClasses: animText } = useInView({ threshold: 0.15, direction: "right" });
  const { ref: refList, animationClasses: animList } = useInView({ threshold: 0.15, direction: "left", triggerOnce: true });

  return (
    <Section id="about" eyebrow={about.eyebrow} dark>
      <Heading level={2} className="mb-8">
        {about.title}
      </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div ref={refText} className={animText}>
            <p className="text-neutral-light text-base leading-relaxed mb-4">
              {about.story}
            </p>
          </div>
          <div ref={refList} className={animList}>
            <p className="text-neutral-light text-base leading-relaxed mb-6">
              {about.philosophy}
            </p>
            <ul className="space-y-3">
              {about.trustBullets.map((bullet: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-lime mt-1 flex-shrink-0" aria-hidden="true">
                    &#9654;
                  </span>
                  <span className="text-neutral-light text-sm">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </Section>
  );
}
