"use client";

import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { landingContent } from "@/content/landing-page";
import { useInView } from "@/lib/useInView";

export default function Offer() {
  const { offer } = landingContent;
  const { ref: refContent, animationClasses: animContent } = useInView({ threshold: 0.1, direction: "up" });
  const { ref: refCta, animationClasses: animCta } = useInView({ threshold: 0.2 });

  return (
    <Section id="offer" eyebrow={offer.eyebrow} className="bg-forest">
        <Heading level={2} className="mb-6">
          {offer.title}
        </Heading>
        <p className="text-neutral-light text-base leading-relaxed mb-10 max-w-2xl">
          {offer.summary}
        </p>

        <div ref={refContent} className={animContent}>
          <h3 className="text-lime text-sm font-bold uppercase tracking-wider mb-4">
            ما يتضمنه البرنامج
          </h3>
          <ul className="space-y-4 mb-10">
            {offer.deliverables.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="text-lime mt-[3px] flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" />
                </svg>
                <span className="text-neutral-light text-sm">{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-lime text-sm font-bold uppercase tracking-wider mb-4">
            لماذا ينجح هذا البرنامج
          </h3>
          <ul className="space-y-4">
            {offer.trustBullets.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="text-emerald mt-[3px] flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" />
                </svg>
                <span className="text-neutral-light text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={refCta} className={animCta}>
          <Button label={offer.ctaLabel} href="#contact" variant="primary" />
        </div>
    </Section>
  );
}
