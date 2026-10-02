import { redirect } from "next/navigation";

type LegacyEditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LegacyEditPostPage({ params }: LegacyEditPostPageProps) {
  const { id } = await params;
  redirect(`/admin/blog/${id}`);
}
