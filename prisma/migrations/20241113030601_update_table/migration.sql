-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `nama_user` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anggota` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `tgl_lahir` DATETIME(3) NOT NULL,
    `tgl_daftar` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `anggota_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `denda` (
    `id` VARCHAR(191) NOT NULL,
    `nominal` DOUBLE NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjaman` (
    `id` VARCHAR(191) NOT NULL,
    `tgl_pinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lama_pinjaman` VARCHAR(191) NOT NULL,
    `nominal_denda` DOUBLE NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `anggota_id` VARCHAR(191) NOT NULL,
    `denda_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_peminjaman` (
    `id` VARCHAR(191) NOT NULL,
    `tgl_kembali` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `buku_id` VARCHAR(191) NOT NULL,
    `peminjaman_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `buku` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `pengarang` VARCHAR(191) NOT NULL,
    `penerbit` VARCHAR(191) NOT NULL,
    `tahun` VARCHAR(191) NOT NULL,
    `isbn` VARCHAR(191) NOT NULL,
    `tgl_input` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `jml_halaman` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `kategori_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KategoriBuku` (
    `id` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_anggota_id_fkey` FOREIGN KEY (`anggota_id`) REFERENCES `anggota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_denda_id_fkey` FOREIGN KEY (`denda_id`) REFERENCES `denda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_peminjaman` ADD CONSTRAINT `detail_peminjaman_peminjaman_id_fkey` FOREIGN KEY (`peminjaman_id`) REFERENCES `peminjaman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_peminjaman` ADD CONSTRAINT `detail_peminjaman_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `buku`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `buku` ADD CONSTRAINT `buku_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `KategoriBuku`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
