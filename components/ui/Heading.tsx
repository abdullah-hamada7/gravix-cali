import React from "react";

interface HeadingProps {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

const levelClasses: Record<number, string> = {
  1: "text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight",
  2: "text-3xl md:text-4xl font-extrabold uppercase tracking-tight",
  3: "text-xl md:text-2xl font-bold uppercase tracking-tight",
};

export default function Heading({
  level = 2,
  children,
  className = "",
}: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  return (
    <Tag className={`${levelClasses[level]} text-white ${className}`.trim()}>
      {children}
    </Tag>
  );
}
