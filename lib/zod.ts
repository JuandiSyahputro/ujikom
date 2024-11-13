import { z } from "zod";

export const LoginSchema = z.object({
  namaUser: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const dataSchema = z.object({
  id: z
    .string()
    .min(3, {
      message: "ID must be at least 3 characters long",
    })
    .optional(),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  age: z.number().min(1, {
    message: "Age must be at least 1",
  }),
  address: z.string().min(3, {
    message: "Address must be at least 3 characters long",
  }),
});

export const schemaAnggota = z.object({
  id: z.string().optional(),
  nama: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  alamat: z.string().min(3, {
    message: "Address must be at least 3 characters long",
  }),
  noHp: z.string().min(3, {
    message: "Phone number must be at least 3 characters long",
  }),
  email: z.string().email({ message: "Email must be valid" }),
  tglLahir: z.date({
    required_error: "Date of birth is required",
  }),
  tglDaftar: z.date({
    required_error: "Date of registration is required",
  }),
});

export const schemaKategoriBuku = z.object({
  id: z.string().optional(),
  kategori: z.string().min(3, {
    message: "Kategori must be at least 3 characters long",
  }),
});

export const schemaBuku = z.object({
  id: z.string().optional(),
  judul: z.string().min(3, {
    message: "Judul must be at least 3 characters long",
  }),
  pengarang: z.string().min(3, {
    message: "pengarang must be at least 3 characters long",
  }),
  penerbit: z.string().min(3, {
    message: "Penerbit must be at least 3 characters long",
  }),
  tahun: z.string().min(3, {
    message: "Tahun must be at least 3 characters long",
  }),
  isbn: z.string().min(3, {
    message: "ISBN must be at least 3 characters long",
  }),
  tglInput: z.date({
    required_error: "Tanggal input is required",
  }),
  jmlHalaman: z.string().min(1, {
    message: "PO Stock must be at least 1 and a valid number",
  }),
  kategoriId: z.string().min(3, {
    message: "ISBN must be at least 3 characters long",
  }),
});

export const schemaUsers = z.object({
  id: z.string().optional(),
  namaUser: z.string().min(3, {
    message: "Nama must be at least 3 characters long",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters long",
  }),
});
export const schemaUsersUpdate = z.object({
  id: z.string().optional(),
  namaUser: z.string().min(3, {
    message: "Nama must be at least 3 characters long",
  }),
});

export const schemaDenda = z.object({
  id: z.string().optional(),
  nominal: z.string().min(3, {
    message: "Nominal must be at least 3 characters long",
  }),
});

export const schemaPeminjaman = z.object({
  id: z.string().optional(),
  tglPinjam: z.date({
    required_error: "Tanggal pinjam is required",
  }),
  tglKembali: z
    .date({
      required_error: "Tanggal kembali is required",
    })
    .optional(),
  lamaPinjaman: z.string().min(1, {
    message: "Lama pinjaman must be at least 1 characters long",
  }),
  anggotaId: z.string().min(3, {
    message: "Anggota ID must be at least 3 characters long",
  }),
  bukuId: z.string().min(3, {
    message: "Buku ID must be at least 3 characters long",
  }),
  dendaId: z.string().min(3, {
    message: "Denda ID must be at least 3 characters long",
  }),
  userId: z.string().min(3, {
    message: "User ID must be at least 3 characters long",
  }),
  detailPinjamanId: z.string().optional(),
});
