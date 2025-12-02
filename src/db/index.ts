<<<<<<< HEAD
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('local.db');
export const db = drizzle(sqlite, { schema });
=======
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database("local.db");

export const db = drizzle(sqlite, { schema });
>>>>>>> f0fb2f2bbc22069f93e6bd3527c102ebf5fe59fa
