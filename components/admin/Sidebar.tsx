"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import { useAdminUi } from "@/components/admin/useAdminUi";
import { Badge } from "@/components/shared/Badge";
import type { AdminUiCopy } from "@/lib/admin-ui-i18n";

export type SidebarNavKey =
  | "navDashboard"
  | "navProjects"
  | "navPosts"
  | "navCareers"
  | "navHomeHero"
  | "navPages"
  | "navContactMessages"
  | "navCareerApplications";

export type SidebarGroupKey = "groupOverview" | "groupContent" | "groupInbox";

type SidebarLink = {
  href: string;
  labelKey: SidebarNavKey;
  badge?: number;
};

type SidebarGroup = {
  labelKey: SidebarGroupKey;
  links: SidebarLink[];
};

type SidebarProps = {
  groups: SidebarGroup[];
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onNavigate?: () => void;
};

function getNavLabel(ui: AdminUiCopy, key: SidebarNavKey): string {
  return ui[key];
}

function getGroupLabel(ui: AdminUiCopy, key: SidebarGroupKey): string {
  return ui[key];
}

export function Sidebar({
  groups,
  collapsed,
  onToggleCollapsed,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();
  const { locale, setLocale } = useAdminContentLocale();
  const ui = useAdminUi();

  return (
    <aside className="admin-sidebar-inner">
      <div className="admin-sidebar-top">
        <button
          type="button"
          className="admin-sidebar-collapse-btn"
          aria-label={collapsed ? ui.expandSidebar : ui.collapseSidebar}
          aria-expanded={!collapsed}
          onClick={onToggleCollapsed}
        >
          {collapsed ? ">" : "<"}
        </button>
      </div>

      <Link
        href="/"
        className="admin-sidebar-brand"
        onClick={onNavigate}
        title="Evolver Admin"
      >
        <span className="admin-sidebar-brand-mark" aria-hidden="true">
          E
        </span>
        <span className="admin-sidebar-brand-copy">
          <span className="admin-sidebar-brand-name">Evolver</span>
          <span className="admin-sidebar-brand-tag">Admin</span>
        </span>
      </Link>

      <div className="admin-sidebar-locale">
        <ProjectLanguageTabs activeTab={locale} onTabChange={setLocale} />
      </div>

      {groups.map((group) => (
        <div key={group.labelKey} className="admin-sidebar-group">
          <div className="admin-sidebar-label">{getGroupLabel(ui, group.labelKey)}</div>
          {group.links.map((link) => {
            const label = getNavLabel(ui, link.labelKey);
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-sidebar-link ${isActive ? "admin-sidebar-link-active" : ""}`}
                onClick={onNavigate}
                title={label}
              >
                <span className="admin-sidebar-link-text">{label}</span>
                <span className="admin-sidebar-link-abbr" aria-hidden="true">
                  {label.charAt(0)}
                </span>
                {link.badge && link.badge > 0 ? (
                  <Badge variant="new">{link.badge}</Badge>
                ) : null}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
