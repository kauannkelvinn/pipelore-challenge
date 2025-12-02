import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const PRIORITY_ENUM = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;
export const STATUS_ENUM = ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

export const repairOrders = sqliteTable("repair_orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  priority: text("priority", { enum: PRIORITY_ENUM }).notNull().default("LOW"),
  status: text("status", { enum: STATUS_ENUM }).notNull().default("OPEN"),
  dueDate: integer("due_date", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});


export type RepairOrder = typeof repairOrders.$inferSelect;
export type NewRepairOrder = typeof repairOrders.$inferInsert;