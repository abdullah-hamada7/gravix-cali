"use client";

import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { landingContent } from "@/content/landing-page";
import { useInView } from "@/lib/useInView";

export default function Offer() {
  const { offer } = landingContent;
  const { ref: refLeft, animationClasses: animLeft } = useInView({ threshold: 0.1, direction: "right" });
  const { ref: refRight, animationClasses: animRight } = useInView({ threshold: 0.1, direction: "left" });
  const { ref: refCta, animationClasses: animCta } = useInView({ threshold: 0.2 });

  return (
    <Section id="offer" eyebrow={offer.eyebrow} className="bg-forest">
      <div
        className="absolute top-0 left-0 w-full h-1 opacity-40 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(90deg, transparent, #bfff00, transparent)",
        }}
      />

        <Heading level={2} className="mb-4">
          {offer.title}
        </Heading>
        <p className="text-neutral-light text-base leading-relaxed mb-8 max-w-2xl">
          {offer.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div ref={refLeft} className={animLeft}>
            <h3 className="text-lime text-sm font-bold uppercase tracking-wider mb-4">
              ما يتضمنه البرنامج
            </h3>
            <ul className="space-y-3">
              {offer.deliverables.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-lime mt-1 flex-shrink-0" aria-hidden="true">
                    &#9654;
                  </span>
                  <span className="text-neutral-light text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div ref={refRight} className={animRight}>
            <h3 className="text-lime text-sm font-bold uppercase tracking-wider mb-4">
              لماذا ينجح هذا البرنامج
            </h3>
            <ul className="space-y-3">
              {offer.trustBullets.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-emerald mt-1 flex-shrink-0" aria-hidden="true">
                    &#9654;
                  </span>
                  <span className="text-neutral-light text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={refCta} className={animCta}>
          <Button label={offer.ctaLabel} href="#contact" variant="primary" />
        </div>
    </Section>
  );
}
