import { AdminLocalizedHeader } from "@/components/admin/AdminLocalizedHeader";
import { HomeHeroEditor } from "@/components/admin/HomeHeroEditor";
import { requireAdmin } from "@/lib/auth";
import { getHomeHeroConfigForAdmin } from "@/lib/home-hero";

export const dynamic = "force-dynamic";

export default async function HomeHeroAdminPage() {
  await requireAdmin();
  const config = await getHomeHeroConfigForAdmin();

  return (
    <>
      <AdminLocalizedHeader titleKey="homeHeroTitle" subtitleKey="homeHeroSubtitle" />
      <HomeHeroEditor initialConfig={config} />
    </>
  );
}
