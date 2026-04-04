interface CardProps {
  headline?: string;
  children: React.ReactNode;
  attribution?: string;
  metric?: string;
  className?: string;
}

export default function Card({
  headline,
  children,
  attribution,
  metric,
  className = "",
}: CardProps) {
  return (
    <article
      className={`border border-emerald bg-forest p-8 relative transition-colors duration-150 hover:border-lime ${className}`}
    >
      {headline && (
        <h3 className="font-heading text-[1.125rem] font-bold uppercase text-lime mb-3">
          {headline}
        </h3>
      )}
      <div className="text-neutral-light text-sm leading-relaxed mb-4 min-w-0 break-words">
        {children}
      </div>
      {metric && (
        <div className="text-emerald text-xs font-semibold uppercase tracking-wider mb-2 min-w-0 break-words">
          {metric}
        </div>
      )}
      {attribution && (
        <div className="text-neutral-mid text-xs font-semibold uppercase tracking-wider min-w-0 break-words">
          {attribution}
        </div>
      )}
    </article>
  );
}
