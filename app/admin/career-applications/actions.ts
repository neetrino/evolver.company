"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { deleteCareerApplication, markCareerApplicationRead } from "@/lib/careers";

export async function markApplicationReadAction(id: string): Promise<void> {
  await requireAdmin();
  await markCareerApplicationRead(id);
  revalidatePath("/admin/career-applications");
}

export async function deleteApplicationAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteCareerApplication(id);
  revalidatePath("/admin/career-applications");
}
