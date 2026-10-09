"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { useAdminUi } from "@/components/admin/useAdminUi";
import type { PageCopyIndexItem } from "@/lib/page-copy/model-types";

type PagesAdminIndexProps = {
  pages: PageCopyIndexItem[];
};

export function PagesAdminIndex({ pages }: PagesAdminIndexProps) {
  const ui = useAdminUi();
  const { locale } = useAdminContentLocale();
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return pages;
    }

    return pages.filter((page) => {
      const title = page.title[locale];
      const description = page.description[locale];
      return `${title} ${description} ${page.publicPath}`.toLowerCase().includes(needle);
    });
  }, [locale, pages, query]);

  return (
    <>
      <AdminPageHeader title={ui.pagesTitle} subtitle={ui.pagesSubtitle} />
      <input
        className="page-copy-search page-copy-search-index"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={ui.pagesSearch}
        type="search"
      />
      {visible.length === 0 ? <p className="admin-table-empty">{ui.pagesEmpty}</p> : null}
      <div className="admin-card-grid">
        {visible.map((page) => (
          <Link key={page.id} href={`/admin/pages/${page.id}`} className="admin-card page-copy-card">
            <div className="page-copy-card-top">
              <h2 className="admin-card-title">{page.title[locale]}</h2>
              {page.customized ? <span className="page-copy-edited">{ui.pagesCustom}</span> : null}
            </div>
            <p className="admin-card-body">{page.description[locale]}</p>
            <p className="page-copy-card-meta">
              {page.publicPath} · {page.fieldCount} {ui.pagesFields}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
