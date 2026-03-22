CREATE TABLE "community" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text,
	"description" text,
	"logo_url" text,
	"bio_url" text,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"institution" text NOT NULL,
	"degree" text NOT NULL,
	"description" text,
	"logo_url" text,
	"start_date" text,
	"end_date" text,
	"order" integer DEFAULT 0
);
