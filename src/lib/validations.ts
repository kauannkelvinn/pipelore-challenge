import { z } from "zod";

export const repairOrderSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres").max(255),
  description: z.string().min(10, "A descrição deve ser detalhada (mín. 10 caracteres)"),
  location: z.string().min(1, "O local é obrigatório"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"], {
    message: "Selecione uma prioridade válida",
  }),
  status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).default("OPEN"),
  dueDate: z.string().transform((str) => new Date(str)),
});

export type RepairOrderFormData = z.infer<typeof repairOrderSchema>;