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
    <Section id="faq" className="bg-forest">
      <div ref={refHeading} className={animHeading}>
        <Heading level={2} className="mb-10">
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
                className="border border-emerald bg-forest-deep overflow-hidden"
              >
                <dt>
                  <button
                    id={`faq-question-${i}`}
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-start focus:outline-none focus:ring-2 focus:ring-lime focus:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="text-white font-semibold text-sm md:text-base pe-4">
                      {item.question}
                    </span>
                    <span
                      className="text-lime flex-shrink-0 transition-transform duration-200 ease-out"
                      aria-hidden="true"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="8" y1="3" x2="8" y2="13" />
                        <line x1="3" y1="8" x2="13" y2="8" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-neutral-light text-sm leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
        </div>
    </Section>
  );
}
