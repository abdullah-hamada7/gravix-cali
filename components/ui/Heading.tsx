import React from "react";

interface HeadingProps {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

const levelClasses: Record<number, string> = {
  1: "text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase tracking-tight leading-[1.1]",
  2: "text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold uppercase tracking-tight leading-[1.15]",
  3: "text-[clamp(1.125rem,3vw,1.5rem)] font-bold uppercase tracking-wide leading-[1.2]",
};

export default function Heading({
  level = 2,
  children,
  className = "",
}: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  return (
    <Tag className={`font-heading text-white ${levelClasses[level]} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
