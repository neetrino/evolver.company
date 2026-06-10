type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2 className="section-header-title">{title}</h2>
      {subtitle ? <p className="section-header-subtitle">{subtitle}</p> : null}
    </div>
  );
}
