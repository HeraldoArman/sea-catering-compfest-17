import { NextResponse } from "next/server";
import { db } from "@/index";
import { subscription } from "@/db/schema";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const userSubscriptions = await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, userId))
      .orderBy(subscription.createdAt);

    return NextResponse.json(userSubscriptions);
  } catch (error) {
    console.error("Failed to fetch subscriptions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
