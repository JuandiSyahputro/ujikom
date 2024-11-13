import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { dataSchema, schemaAnggota, schemaBuku, schemaDenda, schemaKategoriBuku, schemaPeminjaman, schemaUsers, schemaUsersUpdate } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { AuthError } from "next-auth";
import { z } from "zod";

class ActionService {
  async addData(FormData: FormData) {
    const rawData = Object.fromEntries(FormData.entries());

    const formData = {
      name: rawData.name,
      age: Number(rawData.age),
      address: rawData.address,
    } as z.infer<typeof dataSchema>;

    const validateFields = dataSchema.safeParse(formData);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { name, age, address } = formData;
    try {
      const data = await prisma.data.create({
        data: {
          name,
          age,
          address,
        },
      });
      if (data)
        return {
          success: true,
          message: "Data created successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error creating data",
      };
    }
  }
  async updateData(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    const formDataUpdate = {
      id: rawData.id,
      name: rawData.name,
      age: Number(rawData.age),
      address: rawData.address,
    } as z.infer<typeof dataSchema>;

    const validateFields = dataSchema.safeParse(formDataUpdate);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { id, name, age, address } = formDataUpdate;
    try {
      const data = await prisma.data.update({
        where: {
          id,
        },
        data: {
          name,
          age,
          address,
        },
      });
      if (data)
        return {
          success: true,
          message: "Data updated successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error updating data",
      };
    }
  }
  async deleteData({ id }: { id: string }): Promise<boolean> {
    try {
      await prisma.data.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.log(error);

      return false;
      // throw error;
    }
  }

  async loginCredentials(FormData: FormData) {
    const { namaUser, password } = Object.fromEntries(FormData.entries());

    try {
      await signIn("credentials", {
        namaUser,
        password,
        redirectTo: "/peminjaman",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        // console.log(error);
        switch (error.type) {
          case "CredentialsSignin":
            return {
              success: false,
              message: "Invalid username or password",
            };

          default:
            return {
              success: false,
              message: "Something went wrong",
            };
        }
      }
      throw error;
    }
  }

  async addAnggota(FormData: FormData) {
    const rawData = Object.fromEntries(FormData.entries());
    const formData = {
      nama: rawData.nama,
      alamat: rawData.alamat,
      noHp: rawData.noHp,
      email: rawData.email,
      tglDaftar: rawData.tglDaftar ? new Date(rawData.tglDaftar as string) : null,
      tglLahir: rawData.tglLahir ? new Date(rawData.tglLahir as string) : null,
    } as z.infer<typeof schemaAnggota>;

    const validateFields = schemaAnggota.safeParse(formData);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { nama, alamat, noHp, tglDaftar, tglLahir, email } = formData;
    try {
      const data = await prisma.anggota.create({
        data: {
          nama,
          alamat,
          email,
          noHp,
          tglDaftar,
          tglLahir,
        },
      });
      if (data)
        return {
          success: true,
          message: "Anggota created successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error creating data",
      };
    }
  }

  async updateAnggota(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    const formDataUpdate = {
      id: rawData.id,
      nama: rawData.nama,
      alamat: rawData.alamat,
      noHp: rawData.noHp,
      email: rawData.email,
      tglDaftar: rawData.tglDaftar ? new Date(rawData.tglDaftar as string) : null,
      tglLahir: rawData.tglLahir ? new Date(rawData.tglLahir as string) : null,
    } as z.infer<typeof schemaAnggota>;

    const validateFields = schemaAnggota.safeParse(formDataUpdate);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { id, nama, alamat, noHp, tglDaftar, tglLahir, email } = formDataUpdate;
    try {
      const data = await prisma.anggota.update({
        where: {
          id,
        },
        data: {
          nama,
          alamat,
          email,
          noHp,
          tglDaftar,
          tglLahir,
        },
      });
      if (data)
        return {
          success: true,
          message: "Anggota updated successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error updating data",
      };
    }
  }

  async deleteAnggota(id: string) {
    try {
      await prisma.anggota.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.log(error);

      return false;
      // throw error;
    }
  }

  async addKategoriBuku(FormData: FormData) {
    const rawData = Object.fromEntries(FormData.entries());

    const formData = {
      kategori: rawData.kategori,
    } as z.infer<typeof schemaKategoriBuku>;

    const validateFields = schemaKategoriBuku.safeParse(formData);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { kategori } = formData;
    try {
      const data = await prisma.kategoriBuku.create({
        data: {
          kategori,
        },
      });
      if (data)
        return {
          success: true,
          message: "Kategori buku created successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error creating data",
      };
    }
  }

  async updateKategoriBuku(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    const formDataUpdate = {
      id: rawData.id,
      kategori: rawData.kategori,
    } as z.infer<typeof schemaKategoriBuku>;

    const validateFields = schemaKategoriBuku.safeParse(formDataUpdate);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { id, kategori } = formDataUpdate;
    try {
      const data = await prisma.kategoriBuku.update({
        where: {
          id,
        },
        data: {
          kategori,
        },
      });
      if (data)
        return {
          success: true,
          message: "Kategori Buku updated successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error updating kategori buku",
      };
    }
  }

  async deleteKategoriBuku(id: string) {
    try {
      await prisma.kategoriBuku.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.log(error);

      return false;
      // throw error;
    }
  }

  async addBuku(FormData: FormData) {
    const rawData = Object.fromEntries(FormData.entries());

    const formData = {
      judul: rawData.judul,
      pengarang: rawData.pengarang,
      penerbit: rawData.penerbit,
      tahun: rawData.tahun,
      isbn: rawData.isbn,
      tglInput: rawData.tglInput ? new Date(rawData.tglInput as string) : null,
      kategoriId: rawData.kategoriId,
      jmlHalaman: rawData.jmlHalaman,
    } as z.infer<typeof schemaBuku>;

    const validateFields = schemaBuku.safeParse(formData);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { judul, pengarang, penerbit, tahun, isbn, tglInput, kategoriId, jmlHalaman } = formData;
    try {
      const data = await prisma.buku.create({
        data: {
          judul,
          pengarang,
          penerbit,
          tahun,
          isbn,
          tglInput,
          kategoriId,
          jmlHalaman: Number(jmlHalaman),
        },
      });
      if (data)
        return {
          success: true,
          message: "Buku created successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error creating data",
      };
    }
  }

  async updateBuku(FormData: FormData) {
    const rawData = Object.fromEntries(FormData.entries());

    const formData = {
      id: rawData.id,
      judul: rawData.judul,
      pengarang: rawData.pengarang,
      penerbit: rawData.penerbit,
      tahun: rawData.tahun,
      isbn: rawData.isbn,
      tglInput: rawData.tglInput ? new Date(rawData.tglInput as string) : null,
      kategoriId: rawData.kategoriId,
      jmlHalaman: rawData.jmlHalaman,
    } as z.infer<typeof schemaBuku>;

    const validateFields = schemaBuku.safeParse(formData);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { id, isbn, jmlHalaman, judul, kategoriId, penerbit, pengarang, tahun, tglInput } = formData;
    try {
      const data = await prisma.buku.update({
        where: {
          id,
        },
        data: {
          judul,
          pengarang,
          penerbit,
          tahun,
          isbn,
          tglInput,
          kategoriId,
          jmlHalaman: Number(jmlHalaman),
        },
      });
      if (data)
        return {
          success: true,
          message: "Buku updated successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error updating buku",
      };
    }
  }

  async deleteBuku(id: string) {
    try {
      await prisma.buku.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.log(error);

      return false;
      // throw error;
    }
  }

  async addUsers(FormData: FormData) {
    const rawData = Object.fromEntries(FormData.entries());

    const formData = {
      namaUser: rawData.namaUser,
      password: rawData.password,
    } as z.infer<typeof schemaUsers>;

    const validateFields = schemaUsers.safeParse(formData);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { namaUser, password } = formData;
    // untuk has password
    const hashPassword = hashSync(password, 10);
    try {
      const data = await prisma.users.create({
        data: {
          namaUser,
          password: hashPassword,
        },
      });
      if (data)
        return {
          success: true,
          message: "Users created successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error creating users",
      };
    }
  }

  async updateUsers(FormData: FormData) {
    const rawData = Object.fromEntries(FormData.entries());

    const formData = {
      id: rawData.id,
      namaUser: rawData.namaUser,
    } as z.infer<typeof schemaUsersUpdate>;

    const validateFields = schemaUsersUpdate.safeParse(formData);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { id, namaUser } = formData;
    try {
      const data = await prisma.users.update({
        where: {
          id,
        },
        data: {
          namaUser,
        },
      });
      if (data)
        return {
          success: true,
          message: "Users updated successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error updating users",
      };
    }
  }

  async deleteUser(id: string) {
    try {
      await prisma.users.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.log(error);

      return false;
      // throw error;
    }
  }

  async addDenda(FormData: FormData) {
    const rawData = Object.fromEntries(FormData.entries());

    const formData = {
      nominal: rawData.nominal,
    } as z.infer<typeof schemaDenda>;

    const validateFields = schemaDenda.safeParse(formData);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { nominal } = formData;
    try {
      const data = await prisma.denda.create({
        data: {
          nominal: Number(nominal),
        },
      });
      if (data)
        return {
          success: true,
          message: "Denda created successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error creating Denda",
      };
    }
  }
  async updateDenda(FormData: FormData) {
    const rawData = Object.fromEntries(FormData.entries());

    const formData = {
      id: rawData.id,
      nominal: rawData.nominal,
    } as z.infer<typeof schemaDenda>;

    const validateFields = schemaDenda.safeParse(formData);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { id, nominal } = formData;
    try {
      const data = await prisma.denda.update({
        where: {
          id,
        },
        data: {
          nominal: Number(nominal),
        },
      });
      if (data)
        return {
          success: true,
          message: "Denda updated successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error updating Denda",
      };
    }
  }

  async deleteDenda(id: string) {
    try {
      await prisma.denda.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.log(error);

      return false;
      // throw error;
    }
  }

  async addPeminjaman(FormData: FormData) {
    const rawData = Object.fromEntries(FormData.entries());

    const formData = {
      anggotaId: rawData.anggotaId,
      bukuId: rawData.bukuId,
      dendaId: rawData.dendaId,
      lamaPinjaman: rawData.lamaPinjaman,
      tglPinjam: rawData.tglPinjam ? new Date(rawData.tglPinjam as string) : null,
      userId: rawData.userId,
    } as z.infer<typeof schemaPeminjaman>;

    const validateFields = schemaPeminjaman.safeParse(formData);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { anggotaId, bukuId, dendaId, lamaPinjaman, tglPinjam, userId } = formData;
    try {
      const data = await prisma.peminjaman.create({
        data: {
          anggotaId,
          bukuId,
          dendaId,
          lamaPinjaman,
          tglPinjam,
          userId,
        },
      });
      if (data) {
        await prisma.detailPinjam.create({
          data: {
            peminjamanId: data.id,
          },
        });
        return {
          success: true,
          message: "Peminjaman created successfully",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error creating Peminjaman",
      };
    }
  }

  async updatePeminjaman(FormData: FormData) {
    const rawData = Object.fromEntries(FormData.entries());

    const formData = {
      id: rawData.id,
      anggotaId: rawData.anggotaId,
      bukuId: rawData.bukuId,
      dendaId: rawData.dendaId,
      lamaPinjaman: rawData.lamaPinjaman,
      tglPinjam: rawData.tglPinjam ? new Date(rawData.tglPinjam as string) : null,
      userId: rawData.userId,
      tglKembali: rawData.tglKembali ? new Date(rawData.tglKembali as string) : null,
      detailPinjamanId: rawData.detailPinjamanId ? rawData.detailPinjamanId : "",
    } as z.infer<typeof schemaPeminjaman>;

    const validateFields = schemaPeminjaman.safeParse(formData);
    if (!validateFields.success) {
      console.log(validateFields.error);
      return null;
    }

    const { id, anggotaId, bukuId, dendaId, lamaPinjaman, tglPinjam, userId, detailPinjamanId, tglKembali } = formData;
    try {
      console.log(tglKembali);
      if (detailPinjamanId && tglKembali) {
        await prisma.detailPinjam.update({
          where: {
            id: detailPinjamanId,
          },
          data: {
            tglKembali,
          },
        });
      }

      const data = await prisma.peminjaman.update({
        where: {
          id,
        },
        data: {
          anggotaId,
          bukuId,
          dendaId,
          lamaPinjaman,
          tglPinjam,
          userId,
        },
      });
      if (data)
        return {
          success: true,
          message: "Peminjaman updated successfully",
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error updated Peminjaman",
      };
    }
  }

  async deletePinjaman(id: string) {
    console.log(id);
    try {
      await prisma.peminjaman.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.log(error);

      return false;
      // throw error;
    }
  }
}

export const actionService = new ActionService();
