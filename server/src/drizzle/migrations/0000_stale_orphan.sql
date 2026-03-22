CREATE TABLE "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"passwordHash" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "experience" (
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
CREATE TABLE "projects" (
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
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"iconUrl" text,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"avatarUrl" text,
	"message" text NOT NULL,
	"rating" integer DEFAULT 5,
	"order" integer DEFAULT 0
);
