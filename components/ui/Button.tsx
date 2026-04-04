import Link from "next/link";

type ButtonVariant = "primary";

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
    "bg-lime text-forest font-bold tracking-wider px-6 py-3 border-2 border-lime hover:bg-limeBright hover:text-forest active:scale-[0.97] transition-[background-color,color,transform] duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-forest will-change-transform",
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
      <Link href={disabled ? "#" : href} className={`${classes} ${disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`.trim()} aria-disabled={disabled} tabIndex={disabled ? -1 : undefined}>
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
