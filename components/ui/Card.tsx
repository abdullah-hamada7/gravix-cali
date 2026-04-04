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
      className={`border border-emerald bg-forest p-6 relative ${className}`}
    >
      {headline && (
        <h3 className="text-lg font-bold uppercase text-lime mb-3">
          {headline}
        </h3>
      )}
      <div className="text-neutral-light text-sm leading-relaxed mb-4">
        {children}
      </div>
      {metric && (
        <div className="text-emerald text-xs font-semibold uppercase tracking-wider mb-2">
          {metric}
        </div>
      )}
      {attribution && (
        <div className="text-neutral-mid text-xs font-semibold uppercase tracking-wider">
          {attribution}
        </div>
      )}
    </article>
  );
}
