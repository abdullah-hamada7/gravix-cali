"use client";

import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { landingContent } from "@/content/landing-page";
import { useInView } from "@/lib/useInView";

export default function Results() {
  const { results } = landingContent;
  const { ref: refHeading, animationClasses: animHeading } = useInView({ threshold: 0.2 });
  const { ref: refCards, animationClasses: animCards } = useInView({ threshold: 0.1, direction: "up" });

  return (
    <Section id="results" eyebrow={results.eyebrow} dark>
      <div ref={refHeading} className={animHeading}>
        <Heading level={2} className="mb-10">
            {results.title}
        </Heading>
      </div>

        <div ref={refCards} className={animCards}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto min-w-0">
            {results.items.map((item, i: number) => (
              <Card
                key={i}
                headline={item.headline}
                attribution={item.attribution}
                metric={item.metric}
              >
                {item.body}
              </Card>
            ))}
          </div>
        </div>
    </Section>
  );
}
