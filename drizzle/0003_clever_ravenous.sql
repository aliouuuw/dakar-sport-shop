CREATE TYPE "public"."quote_status" AS ENUM('new', 'pending', 'sent', 'accepted', 'rejected');--> statement-breakpoint
CREATE TABLE "quotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"club_name" varchar(255) NOT NULL,
	"contact_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"items" json DEFAULT '[]'::json NOT NULL,
	"status" "quote_status" DEFAULT 'new' NOT NULL,
	"total_price" integer DEFAULT 0 NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
