"use client";

import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminUi } from "@/components/admin/useAdminUi";

const DASHBOARD_LINKS = [
  {
    href: "/admin/projects",
    titleKey: "projectsTitle",
    bodyKey: "dashboardProjectsBody",
  },
  {
    href: "/admin/blog",
    titleKey: "postsTitle",
    bodyKey: "dashboardPostsBody",
  },
  {
    href: "/admin/careers",
    titleKey: "careersTitle",
    bodyKey: "dashboardCareersBody",
  },
  {
    href: "/admin/career-applications",
    titleKey: "applicationsTitle",
    bodyKey: "dashboardApplicationsBody",
  },
  {
    href: "/admin/home-hero",
    titleKey: "homeHeroTitle",
    bodyKey: "dashboardHomeHeroBody",
  },
  {
    href: "/admin/contact-messages",
    titleKey: "contactTitle",
    bodyKey: "dashboardContactBody",
  },
] as const;

export function AdminDashboardClient() {
  const ui = useAdminUi();

  return (
    <>
      <AdminPageHeader title={ui.dashboardTitle} subtitle={ui.dashboardSubtitle} />
      <div className="admin-card-grid">
        {DASHBOARD_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="admin-card block">
            <h2 className="admin-card-title">{ui[link.titleKey]}</h2>
            <p className="admin-card-body">{ui[link.bodyKey]}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
