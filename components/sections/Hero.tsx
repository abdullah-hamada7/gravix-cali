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
      <div className="max-w-6xl mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(3rem,8vw,6rem)] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-8 lg:gap-16 items-center">
          <div ref={ref} className={`relative z-10 ${animationClasses}`}>
            <span className="block text-lime text-[0.75rem] font-semibold tracking-[0.15em] mb-4 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards]">
              {hero.eyebrow}
            </span>
            <h1 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight text-white mb-6 leading-[1.1] opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]">
              {hero.title}
            </h1>
            <p className="text-neutral-light text-base md:text-lg leading-relaxed mb-10 max-w-xl opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.35s_forwards]">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards]">
              <Button label={hero.ctaPrimary.label} href={hero.ctaPrimary.href} variant="primary" />
              <a
                href={hero.ctaSecondary.href}
                className="text-lime text-[0.875rem] font-semibold tracking-wider py-3 hover:text-limeBright transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime"
              >
                {hero.ctaSecondary.label}
              </a>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center lg:justify-end opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.3s_forwards]">
            <div className="w-full max-w-md aspect-[4/5] relative overflow-hidden">
              <Image
                src="/kholy.jpg"
                alt={hero.imageAlt}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
