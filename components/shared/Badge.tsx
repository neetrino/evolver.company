type BadgeVariant = "success" | "muted" | "accent" | "new";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
};

export function Badge({ children, variant = "muted" }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}
