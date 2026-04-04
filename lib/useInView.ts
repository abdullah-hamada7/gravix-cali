"use client";

import { useEffect, useRef, useState } from "react";

type AnimationDirection = "up" | "down" | "left" | "right" | "none";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  direction?: AnimationDirection;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(options: UseInViewOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    direction = "up",
  } = options;

  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  const directionStyles: Record<AnimationDirection, string> = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  const animationClasses = `transition-all duration-700 ease-out ${
    isInView
      ? "opacity-100 translate-y-0 translate-x-0"
      : `opacity-0 ${directionStyles[direction]}`
  }`;

  return { ref, isInView, animationClasses };
}
