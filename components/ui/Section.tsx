interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export default function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
  dark = false,
}: SectionProps) {
  const bg = dark
    ? "bg-forest text-neutral-light"
    : "bg-forest-deep text-neutral-light";

  return (
    <section
      id={id}
      className={`relative py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)] ${bg} ${className}`}
    >
      <div className="max-w-6xl mx-auto relative">
        {eyebrow && (
          <span className="block text-lime text-[0.75rem] font-semibold tracking-[0.15em] mb-2">
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 className="font-heading text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold tracking-wide text-white leading-[1.2] mb-8">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
