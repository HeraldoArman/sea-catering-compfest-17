import { NextResponse } from "next/server";
import { db } from "@/index";
import { user, subscription } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function GET() {
  const totalUsers = await db
    .select()
    .from(user)
    .then((res) => res.length);

  const activeSubscriptions = await db
    .select()
    .from(subscription).where(eq(subscription.status, "active"))
    .then((res) => res.length);

  const totalRevenue = await db
    .select({ totalPrice: subscription.totalPrice })
    .from(subscription)
    .then((res) => res.reduce((sum, s) => sum + (s.totalPrice || 0), 0));

  const mealsDelivered = 0;

  return NextResponse.json({
    totalUsers,
    activeSubscriptions,
    totalRevenue,
    mealsDelivered,
  });
}
