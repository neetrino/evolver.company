"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/shared/Badge";

type SidebarLink = {
  href: string;
  label: string;
  badge?: number;
};

type SidebarGroup = {
  label: string;
  links: SidebarLink[];
};

type SidebarProps = {
  groups: SidebarGroup[];
  onNavigate?: () => void;
};

export function Sidebar({ groups, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar-inner">
      <Link href="/admin" className="admin-sidebar-brand" onClick={onNavigate}>
        Evolver Admin
      </Link>

      {groups.map((group) => (
        <div key={group.label} className="admin-sidebar-group">
          <div className="admin-sidebar-label">{group.label}</div>
          {group.links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-sidebar-link ${isActive ? "admin-sidebar-link-active" : ""}`}
                onClick={onNavigate}
              >
                <span>{link.label}</span>
                {link.badge && link.badge > 0 ? <Badge variant="new">{link.badge}</Badge> : null}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
