import { NextResponse } from "next/server";
import { eq, sum, count } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/index";
import { subscription } from "@/db/schema";
import { auth } from "@/utils/auth";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const mySubscriptionsResult = await db
      .select({
        value: count(subscription.id),
      })
      .from(subscription)
      .where(eq(subscription.userId, userId));

    const mySubscriptions = mySubscriptionsResult[0]?.value || 0;

    const totalSpendResult = await db
      .select({
        value: sum(subscription.totalPrice),
      })
      .from(subscription)
      .where(eq(subscription.userId, userId));

    const totalSpend = Number(totalSpendResult[0]?.value) || 0;

    const mealsDelivered = 0;
    const activeSubscriptions = await db
      .select()
      .from(subscription)
      .where(
        eq(subscription.status, "active") && eq(subscription.userId, userId),
      );

    console.log("Active Subscriptions:", activeSubscriptions);
    const activeSubscriptionsCount = activeSubscriptions.length;

    console.log(activeSubscriptionsCount);

    return NextResponse.json({
      mySubscriptions,
      mealsDelivered,
      totalSpend,
      activeSubscriptionsCount,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
