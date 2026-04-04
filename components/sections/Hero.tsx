"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import { landingContent } from "@/content/landing-page";
import { useInView } from "@/lib/useInView";

export default function Hero() {
  const { hero } = landingContent;
  const { ref, animationClasses } = useInView({ threshold: 0.2, direction: "up" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-forest pt-16 overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, transparent 40%, #bfff00 40%, #bfff00 41%, transparent 41%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-2/3 h-1/2 opacity-5 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(225deg, transparent 60%, #00a86b 60%, #00a86b 61%, transparent 61%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(3rem,8vw,6rem)] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div ref={ref} className={`relative z-10 ${animationClasses}`}>
            <span className="block text-lime text-xs font-semibold uppercase tracking-widest mb-4">
              {hero.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white mb-6 leading-none">
              {hero.title}
            </h1>
            <p className="text-neutral-light text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button label={hero.ctaPrimary.label} href={hero.ctaPrimary.href} variant="primary" />
              <Button label={hero.ctaSecondary.label} href={hero.ctaSecondary.href} variant="secondary" />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center">
            <div className="w-full max-w-md aspect-square relative border-2 border-emerald bg-forest-deep overflow-hidden">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-lime z-10" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-lime z-10" />
              <Image
                src="/kholy.jpg"
                alt={hero.imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
