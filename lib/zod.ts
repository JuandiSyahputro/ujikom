import { z } from "zod";

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
