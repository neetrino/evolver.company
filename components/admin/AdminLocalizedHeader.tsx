"use client";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminUi } from "@/components/admin/useAdminUi";
import type { AdminUiCopy } from "@/lib/admin-ui-i18n";

type AdminLocalizedHeaderProps = {
  titleKey: keyof AdminUiCopy;
  subtitleKey: keyof AdminUiCopy;
  actions?: React.ReactNode;
};

export function AdminLocalizedHeader({
  titleKey,
  subtitleKey,
  actions,
}: AdminLocalizedHeaderProps) {
  const ui = useAdminUi();

  return (
    <AdminPageHeader
      title={String(ui[titleKey])}
      subtitle={String(ui[subtitleKey])}
      actions={actions}
    />
  );
}
