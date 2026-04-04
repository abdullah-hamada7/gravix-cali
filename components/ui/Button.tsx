import Link from "next/link";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  label: string;
  href?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-lime text-forest font-bold uppercase tracking-wider px-6 py-3 border-2 border-lime hover:bg-limeBright hover:text-forest transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-forest",
  secondary:
    "bg-transparent text-lime font-bold uppercase tracking-wider px-6 py-3 border-2 border-lime hover:bg-lime hover:text-forest transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-forest",
};

export default function Button({
  label,
  href,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  className = "",
  children,
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {children || label}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children || label}
    </button>
  );
}
