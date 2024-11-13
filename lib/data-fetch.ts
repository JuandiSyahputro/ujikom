import { prisma } from "@/lib/prisma";

class DataService {
  async getData() {
    try {
      const data = await prisma.data.findMany();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  async getDataById(id: string) {
    try {
      const data = await prisma.data.findUnique({
        where: {
          id,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAnggota() {
    try {
      const data = await prisma.anggota.findMany();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAnggotaById(id: string) {
    try {
      const data = await prisma.anggota.findUnique({
        where: {
          id,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getKategoriBuku() {
    try {
      const data = await prisma.kategoriBuku.findMany();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getKategoriBukuById(id: string) {
    try {
      const data = await prisma.kategoriBuku.findUnique({
        where: {
          id,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getBuku() {
    try {
      const data = await prisma.buku.findMany({
        include: {
          kategori: true,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getBukuById(id: string) {
    try {
      const data = await prisma.buku.findUnique({
        where: {
          id,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getUsers() {
    try {
      const data = await prisma.users.findMany();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getUsersById(id: string) {
    try {
      const data = await prisma.users.findUnique({
        where: {
          id,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getDenda() {
    try {
      const data = await prisma.denda.findMany();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  async getDendaById(id: string) {
    try {
      const data = await prisma.denda.findUnique({
        where: {
          id,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  async getPeminjaman() {
    try {
      const data = await prisma.peminjaman.findMany({
        include: {
          anggota: true,
          denda: true,
          user: true,
          buku: true,
          DetailPinjam: true,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getPeminjamanById(id: string) {
    try {
      const data = await prisma.peminjaman.findUnique({
        where: {
          id,
        },
        include: {
          DetailPinjam: true,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getDetailPeminjaman() {
    try {
      const data = await prisma.detailPinjam.findMany();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
export const dataService = new DataService();
