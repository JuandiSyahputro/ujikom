/*
  Warnings:

  - Added the required column `buku_id` to the `peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peminjaman` ADD COLUMN `buku_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `buku`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
