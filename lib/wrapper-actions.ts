"use server";
import { actionService } from "@/lib/actions";

// ini adalaha semua fungsi untuk membungkus fungsi action daru class ActionService di lib/actions dengan konsep OOP
export async function loginCredentials(formData: FormData) {
  return actionService.loginCredentials(formData);
}

export async function addAnggota(formData: FormData) {
  return actionService.addAnggota(formData);
}
export async function updateAnggota(formData: FormData) {
  return actionService.updateAnggota(formData);
}

export async function deleteAnggota(id: string) {
  return actionService.deleteAnggota(id);
}

export async function addKategoriBuku(formData: FormData) {
  return actionService.addKategoriBuku(formData);
}

export async function updateKategoriBuku(formData: FormData) {
  return actionService.updateKategoriBuku(formData);
}

export async function deleteKategoriBuku(id: string) {
  return actionService.deleteKategoriBuku(id);
}

export async function addBuku(formData: FormData) {
  return actionService.addBuku(formData);
}

export async function updateBuku(formData: FormData) {
  return actionService.updateBuku(formData);
}
export async function deleteBuku(id: string) {
  return actionService.deleteBuku(id);
}

export async function addUsers(formData: FormData) {
  return actionService.addUsers(formData);
}
export async function updateUsers(formData: FormData) {
  return actionService.updateUsers(formData);
}

export async function deleteUser(id: string) {
  return actionService.deleteUser(id);
}
export async function addDenda(formData: FormData) {
  return actionService.addDenda(formData);
}
export async function updateDenda(formData: FormData) {
  return actionService.updateDenda(formData);
}
export async function deleteDenda(id: string) {
  return actionService.deleteDenda(id);
}

export async function addPeminjaman(formData: FormData) {
  return actionService.addPeminjaman(formData);
}
export async function updatePeminjaman(formData: FormData) {
  return actionService.updatePeminjaman(formData);
}
export async function deletePinjaman(id: string) {
  return actionService.deletePinjaman(id);
}
