"use server";
import { actionService } from "@/lib/actions";

export async function addData(formData: FormData) {
  return actionService.addData(formData);
}

export async function updateData(formData: FormData) {
  return actionService.updateData(formData);
}

export async function deleteData(id: string) {
  return actionService.deleteData({ id });
}
