type AdminPageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export function AdminPageHeader({ title, subtitle, actions }: AdminPageHeaderProps) {
  return (
    <div className="admin-page-header flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="admin-page-title">{title}</h1>
        {subtitle ? <p className="admin-page-subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}
