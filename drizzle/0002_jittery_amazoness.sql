CREATE TYPE "public"."subscription_status" AS ENUM('active', 'paused', 'cancelled');--> statement-breakpoint
ALTER TABLE "subscription" ADD COLUMN "status" "subscription_status" NOT NULL;