CREATE TABLE "communityTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text,
	"description" text,
	"logo_url" text,
	"bio_url" text,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "contactMessagesTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "educationTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"institution" text NOT NULL,
	"degree" text NOT NULL,
	"description" text,
	"logo_url" text,
	"start_date" text,
	"end_date" text,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "experienceTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"location" text,
	"startDate" text NOT NULL,
	"endDate" text,
	"bullets" text[],
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "projectsTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"techStack" text[] NOT NULL,
	"imageUrl" text,
	"liveUrl" text,
	"githubUrl" text,
	"featured" boolean DEFAULT false,
	"order" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "skillsTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"iconUrl" text,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "testimonialsTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"avatarUrl" text,
	"message" text NOT NULL,
	"rating" integer DEFAULT 5,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "usersTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"passwordHash" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "usersTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "admin" CASCADE;--> statement-breakpoint
DROP TABLE "community" CASCADE;--> statement-breakpoint
DROP TABLE "contact_messages" CASCADE;--> statement-breakpoint
DROP TABLE "education" CASCADE;--> statement-breakpoint
DROP TABLE "experience" CASCADE;--> statement-breakpoint
DROP TABLE "projects" CASCADE;--> statement-breakpoint
DROP TABLE "skills" CASCADE;--> statement-breakpoint
DROP TABLE "testimonials" CASCADE;