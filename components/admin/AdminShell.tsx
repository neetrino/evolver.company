"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { AdminContentLocaleProvider } from "@/components/admin/AdminContentLocaleProvider";
import {
  Sidebar,
  type SidebarGroupKey,
  type SidebarNavKey,
} from "@/components/admin/Sidebar";
import { useAdminUi } from "@/components/admin/useAdminUi";

const SIDEBAR_COLLAPSED_KEY = "evolver-admin-sidebar-collapsed";

const collapsedListeners = new Set<() => void>();

function emitCollapsedChange(): void {
  collapsedListeners.forEach((listener) => listener());
}

function subscribeCollapsed(listener: () => void): () => void {
  collapsedListeners.add(listener);
  return () => {
    collapsedListeners.delete(listener);
  };
}

function getCollapsedSnapshot(): boolean {
  return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
}

function getCollapsedServerSnapshot(): boolean {
  return false;
}

type AdminShellProps = {
  children: React.ReactNode;
  unreadCount?: number;
  applicationUnreadCount?: number;
  topbarActions?: React.ReactNode;
};

type NavGroup = {
  labelKey: SidebarGroupKey;
  links: Array<{
    href: string;
    labelKey: SidebarNavKey;
    badge?: number;
  }>;
};

function AdminShellInner({
  children,
  unreadCount = 0,
  applicationUnreadCount = 0,
  topbarActions,
}: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarCollapsed = useSyncExternalStore(
    subscribeCollapsed,
    getCollapsedSnapshot,
    getCollapsedServerSnapshot,
  );
  const ui = useAdminUi();

  const toggleSidebarCollapsed = useCallback(() => {
    const next = !getCollapsedSnapshot();
    window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
    emitCollapsedChange();
  }, []);

  const groups: NavGroup[] = [
    {
      labelKey: "groupOverview",
      links: [{ href: "/admin", labelKey: "navDashboard" }],
    },
    {
      labelKey: "groupContent",
      links: [
        { href: "/admin/projects", labelKey: "navProjects" },
        { href: "/admin/posts", labelKey: "navPosts" },
        { href: "/admin/careers", labelKey: "navCareers" },
        { href: "/admin/home-hero", labelKey: "navHomeHero" },
      ],
    },
    {
      labelKey: "groupInbox",
      links: [
        {
          href: "/admin/contact-messages",
          labelKey: "navContactMessages",
          badge: unreadCount,
        },
        {
          href: "/admin/career-applications",
          labelKey: "navCareerApplications",
          badge: applicationUnreadCount,
        },
      ],
    },
  ];

  const sidebarClassName = [
    "admin-sidebar",
    sidebarOpen ? "admin-sidebar-open" : "",
    sidebarCollapsed ? "admin-sidebar-collapsed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="admin-shell">
      {sidebarOpen ? (
        <button
          type="button"
          className="admin-sidebar-overlay"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <div className={sidebarClassName}>
        <Sidebar
          groups={groups}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={toggleSidebarCollapsed}
          onNavigate={() => setSidebarOpen(false)}
        />
      </div>

      <div className="admin-main">
        <div className="admin-topbar">
          <button
            type="button"
            className="admin-mobile-toggle"
            onClick={() => setSidebarOpen(true)}
          >
            {ui.menu}
          </button>
          <div className="ml-auto flex items-center gap-3">{topbarActions}</div>
        </div>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

export function AdminShell(props: AdminShellProps) {
  return (
    <AdminContentLocaleProvider>
      <AdminShellInner {...props} />
    </AdminContentLocaleProvider>
  );
}
