-- Migration: Fix schema and add certifications
-- This script renames [entity]Id columns back to id and creates certificationsTable

-- 1. Rename columns in existing tables (using IF EXISTS to be safe)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projectsTable' AND column_name = 'projectId') THEN
        ALTER TABLE "projectsTable" RENAME COLUMN "projectId" TO "id";
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'skillsTable' AND column_name = 'skillId') THEN
        ALTER TABLE "skillsTable" RENAME COLUMN "skillId" TO "id";
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonialsTable' AND column_name = 'testimonialId') THEN
        ALTER TABLE "testimonialsTable" RENAME COLUMN "testimonialId" TO "id";
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'educationTable' AND column_name = 'educationId') THEN
        ALTER TABLE "educationTable" RENAME COLUMN "educationId" TO "id";
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communityTable' AND column_name = 'communityId') THEN
        ALTER TABLE "communityTable" RENAME COLUMN "communityId" TO "id";
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'usersTable' AND column_name = 'userId') THEN
        ALTER TABLE "usersTable" RENAME COLUMN "userId" TO "id";
    END IF;
END $$;

-- 2. Create certificationsTable
CREATE TABLE IF NOT EXISTS "certificationsTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"issuer" text NOT NULL,
	"certificateName" text NOT NULL,
	"description" text,
	"issueDate" text NOT NULL,
	"expiryDate" text,
	"certificateUrl" text,
	"order" integer DEFAULT 0
);

-- 3. Drop experienceTable if it still exists
DROP TABLE IF EXISTS "experienceTable";
