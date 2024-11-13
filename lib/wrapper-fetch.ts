"use server";
import { dataService } from "@/lib/data-fetch";

// ini adalaha semua fungsi untuk membungkus fungsi data-fetch dari class dataService di lib/data-fetch dengan konsep OOP

export const fetchAnggota = async () => {
  return dataService.getAnggota();
};

export const fetchAnggotaById = async (id: string) => {
  return dataService.getAnggotaById(id);
};

export const fetchKategoriBuku = async () => {
  return dataService.getKategoriBuku();
};

export const fetchKategoriBukuById = async (id: string) => {
  return dataService.getKategoriBukuById(id);
};

export const fetchBuku = async () => {
  return dataService.getBuku();
};
export const fetchgetBukuById = async (id: string) => {
  return dataService.getBukuById(id);
};
export const fetchUsers = async () => {
  return dataService.getUsers();
};
export const fetchgetUsersById = async (id: string) => {
  return dataService.getUsersById(id);
};
export const fetchDenda = async () => {
  return dataService.getDenda();
};
export const fetchgetDendaById = async (id: string) => {
  return dataService.getDendaById(id);
};
export const fetchPeminjaman = async () => {
  return dataService.getPeminjaman();
};
export const fetchgetPeminjamanById = async (id: string) => {
  return dataService.getPeminjamanById(id);
};
export const fetchDetailPeminjaman = async () => {
  return dataService.getDetailPeminjaman();
};
