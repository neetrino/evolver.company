"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";

type AdminShellProps = {
  children: React.ReactNode;
  unreadCount?: number;
  applicationUnreadCount?: number;
  topbarActions?: React.ReactNode;
};

export function AdminShell({
  children,
  unreadCount = 0,
  applicationUnreadCount = 0,
  topbarActions,
}: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const groups = [
    {
      label: "Overview",
      links: [{ href: "/admin", label: "Dashboard" }],
    },
    {
      label: "Content",
      links: [
        { href: "/admin/projects", label: "Projects" },
        { href: "/admin/posts", label: "Blog posts" },
        { href: "/admin/careers", label: "Careers" },
        { href: "/admin/home-hero", label: "Home Hero" },
      ],
    },
    {
      label: "Inbox",
      links: [
        {
          href: "/admin/contact-messages",
          label: "Contact Messages",
          badge: unreadCount,
        },
        {
          href: "/admin/career-applications",
          label: "Career applications",
          badge: applicationUnreadCount,
        },
      ],
    },
  ];

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

      <div className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open" : ""}`}>
        <Sidebar groups={groups} onNavigate={() => setSidebarOpen(false)} />
      </div>

      <div className="admin-main">
        <div className="admin-topbar">
          <button
            type="button"
            className="admin-mobile-toggle"
            onClick={() => setSidebarOpen(true)}
          >
            Menu
          </button>
          <div className="ml-auto flex items-center gap-3">{topbarActions}</div>
        </div>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
