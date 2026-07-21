import { redirect } from "next/navigation";

type EditCareerJobPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCareerJobPage({ params }: EditCareerJobPageProps) {
  await params;
  redirect("/admin/careers");
}
