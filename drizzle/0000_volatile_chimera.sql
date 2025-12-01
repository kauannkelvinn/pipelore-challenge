CREATE TABLE `repair_orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(255) NOT NULL,
	`description` text NOT NULL,
	`location` text NOT NULL,
	`priority` text NOT NULL,
	`status` text DEFAULT 'OPEN' NOT NULL,
	`due_date` integer NOT NULL,
	`completed_at` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
