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
}
export const dataService = new DataService();
