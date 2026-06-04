type AdminRootLayoutProps = {
  children: React.ReactNode;
};

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return <div className="admin-theme">{children}</div>;
}
