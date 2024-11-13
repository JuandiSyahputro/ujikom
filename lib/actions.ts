import { prisma } from "@/lib/prisma";
import { dataSchema } from "@/lib/zod";
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
}

export const actionService = new ActionService();
