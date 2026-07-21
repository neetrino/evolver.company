import { redirect } from "next/navigation";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  await params;
  redirect("/admin/projects");
}
