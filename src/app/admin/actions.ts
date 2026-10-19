"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isLeadStatus, updateLeadStatus } from "@/features/leads/queries";

export async function updateStatusAction(formData: FormData): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !isLeadStatus(status)) {
    return;
  }

  await updateLeadStatus(id, status);
  revalidatePath("/admin");
}
