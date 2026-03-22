CREATE TABLE "siteSettingsTable" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
