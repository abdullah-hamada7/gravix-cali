"use client";

import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { landingContent } from "@/content/landing-page";
import { useInView } from "@/lib/useInView";

export default function Offer() {
  const { offer } = landingContent;
  const { ref: refContent, animationClasses: animContent } = useInView({ threshold: 0.1, direction: "up" });
  const { ref: refCta, animationClasses: animCta } = useInView({ threshold: 0.2 });

  return (
    <section id="offer" className="relative bg-forest py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]">
      <div className="max-w-6xl mx-auto relative">
        <div
          className="absolute inset-0 border-y-2 border-lime/20 pointer-events-none"
          aria-hidden="true"
        />

        <div ref={refContent} className={animContent}>
          <span className="block text-lime text-[0.75rem] font-semibold tracking-[0.15em] mb-2">
            {offer.eyebrow}
          </span>
          <Heading level={2} className="mb-6">
            {offer.title}
          </Heading>
          <p className="text-neutral-light text-base leading-relaxed mb-10 max-w-2xl">
            {offer.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
            <div>
              <h3 className="text-lime text-sm font-bold tracking-wider mb-4">
                ما يتضمنه البرنامج
              </h3>
              <ul className="space-y-4">
                {offer.deliverables.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="text-lime mt-[3px] flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                    <span className="text-neutral-light text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lime text-sm font-bold tracking-wider mb-4">
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
          </div>
        </div>

        <div ref={refCta} className={animCta}>
          <Button label={offer.ctaLabel} href="#contact" variant="primary" />
        </div>
      </div>
    </section>
  );
}
