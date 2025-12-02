import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const PRIORITY_ENUM = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;
export const STATUS_ENUM = ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

export const repairOrders = pgTable("repair_orders", {
  id: serial("id").primaryKey(),
  
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  
  priority: text("priority").notNull().default("LOW"),
  status: text("status").notNull().default("OPEN"),
  
  dueDate: timestamp("due_date").notNull(),
  completedAt: timestamp("completed_at"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type RepairOrder = typeof repairOrders.$inferSelect;
export type NewRepairOrder = typeof repairOrders.$inferInsert;



