import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { HomeHeroEditor } from "@/components/admin/HomeHeroEditor";
import { getHomeHeroConfigForAdmin } from "@/lib/home-hero";

export const dynamic = "force-dynamic";

export default async function HomeHeroAdminPage() {
  const config = await getHomeHeroConfigForAdmin();

  return (
    <>
      <AdminPageHeader
        title="Home Hero"
        subtitle="Manage homepage hero carousel slides, images, and bilingual copy."
      />
      <HomeHeroEditor initialConfig={config} />
    </>
  );
}
