import { NextResponse } from "next/server";
import { db } from "@/index"; // adjust import to your drizzle db instance
import { user, subscription } from "@/db/schema";

export async function GET() {
  // Total users
  const totalUsers = await db
    .select()
    .from(user)
    .then((res) => res.length);

  const activeSubscriptions = await db
    .select()
    .from(subscription)
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
