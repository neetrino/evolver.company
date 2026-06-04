import { prisma } from "@/lib/db";

export async function getContactMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getUnreadContactCount(): Promise<number> {
  return prisma.contactMessage.count({ where: { isRead: false } });
}

export async function markContactMessageRead(id: string): Promise<void> {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });
}

export async function deleteContactMessage(id: string): Promise<void> {
  await prisma.contactMessage.delete({ where: { id } });
}
