CREATE TYPE "public"."subscription_plan" AS ENUM('diet', 'protein', 'royal');--> statement-breakpoint
CREATE TABLE "subscription" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan" "subscription_plan" NOT NULL,
	"meal_types" jsonb NOT NULL,
	"delivery_days" jsonb NOT NULL,
	"allergies" text,
	"total_price" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;