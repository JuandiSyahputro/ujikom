-- DropForeignKey
ALTER TABLE `detail_peminjaman` DROP FOREIGN KEY `detail_peminjaman_peminjaman_id_fkey`;

-- AddForeignKey
ALTER TABLE `detail_peminjaman` ADD CONSTRAINT `detail_peminjaman_peminjaman_id_fkey` FOREIGN KEY (`peminjaman_id`) REFERENCES `peminjaman`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
