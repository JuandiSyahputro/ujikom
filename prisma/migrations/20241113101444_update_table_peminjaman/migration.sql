/*
  Warnings:

  - You are about to drop the column `buku_id` on the `detail_peminjaman` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `detail_peminjaman` DROP FOREIGN KEY `detail_peminjaman_buku_id_fkey`;

-- AlterTable
ALTER TABLE `detail_peminjaman` DROP COLUMN `buku_id`;
