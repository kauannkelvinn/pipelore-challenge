import { z } from "zod";
import { PRIORITY_ENUM, STATUS_ENUM } from "@/db/schema";

export const repairOrderSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres").max(255),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  location: z.string().min(1, "Local obrigatório"),
  priority: z.enum(PRIORITY_ENUM),
  status: z.enum(STATUS_ENUM).default("OPEN"),
  dueDate: z.string().or(z.date()).transform((val) => new Date(val)),
});