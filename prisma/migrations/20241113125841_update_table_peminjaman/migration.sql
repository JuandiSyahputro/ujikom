/*
  Warnings:

  - A unique constraint covering the columns `[nama_user]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_nama_user_key` ON `user`(`nama_user`);
