"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { deleteContactMessage, markContactMessageRead } from "@/lib/contact";

export async function markMessageReadAction(id: string): Promise<void> {
  await requireAdmin();
  await markContactMessageRead(id);
  revalidatePath("/admin/contact-messages");
}

export async function deleteMessageAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteContactMessage(id);
  revalidatePath("/admin/contact-messages");
}
