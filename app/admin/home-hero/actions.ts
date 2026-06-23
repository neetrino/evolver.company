"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  getHomeHeroConfigForAdmin,
  resetHomeHeroConfig,
  saveHomeHeroConfig,
} from "@/lib/home-hero";
import type { HomeHeroConfig } from "@/lib/home-hero-types";

export type HomeHeroActionState = {
  error?: string;
  success?: string;
};

function revalidateHomeHeroPaths(): void {
  revalidateTag("home-hero", "max");
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/hy");
  revalidatePath("/admin/home-hero");
}

export async function getHomeHeroAdminAction(): Promise<HomeHeroConfig> {
  await requireAdmin();
  return getHomeHeroConfigForAdmin();
}

export async function saveHomeHeroAction(
  config: HomeHeroConfig,
): Promise<HomeHeroActionState> {
  await requireAdmin();

  try {
    await saveHomeHeroConfig(config);
    revalidateHomeHeroPaths();
    return { success: "Home hero saved successfully." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save home hero.";
    return { error: message };
  }
}

export async function resetHomeHeroAction(): Promise<HomeHeroActionState> {
  await requireAdmin();

  try {
    await resetHomeHeroConfig();
    revalidateHomeHeroPaths();
    return { success: "Home hero reset to defaults." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to reset home hero.";
    return { error: message };
  }
}
