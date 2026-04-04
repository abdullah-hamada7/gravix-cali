"use client";

import { useState } from "react";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { landingContent } from "@/content/landing-page";
import { useInView } from "@/lib/useInView";

export default function FAQ() {
  const { faq } = landingContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: refHeading, animationClasses: animHeading } = useInView({ threshold: 0.2 });
  const { ref: refList, animationClasses: animList } = useInView({ threshold: 0.05, direction: "up" });

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" eyebrow={faq.eyebrow} className="bg-forest">
      <div ref={refHeading} className={animHeading}>
        <Heading level={2} className="mb-8">
            {faq.title}
        </Heading>
      </div>

        <div ref={refList} className={animList} style={{ transitionDelay: "200ms" }}>
        <dl className="space-y-3">
          {faq.items.map((item, i: number) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-emerald bg-forest-deep"
              >
                <dt>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-lime focus:ring-inset"
                    aria-expanded={isOpen}
                  >
                    <span className="text-white font-semibold text-sm md:text-base pr-4">
                      {item.question}
                    </span>
                    <span
                      className="text-lime flex-shrink-0 transition-transform duration-200"
                      aria-hidden="true"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                      }}
                    >
                      +
                    </span>
                  </button>
                </dt>
                {isOpen && (
                  <dd className="px-6 pb-4 text-neutral-light text-sm leading-relaxed">
                    {item.answer}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
        </div>
    </Section>
  );
}
