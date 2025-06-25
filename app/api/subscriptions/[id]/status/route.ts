import { NextResponse, NextRequest } from "next/server";
import { db } from "@/index";
import { subscription } from "@/db/schema";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";


type SubscriptionStatus = "active" | "paused" | "cancelled";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;


    const { id: subscriptionId } = await params;

    const { status } = (await request.json()) as { status: SubscriptionStatus };


    const validStatuses: SubscriptionStatus[] = [
      "active",
      "paused",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status provided" },
        { status: 400 }
      );
    }

    const existingSubscription = await db
      .select()
      .from(subscription)
      .where(
        and(
          eq(subscription.id, subscriptionId),
          eq(subscription.userId, userId)
        )
      )
      .limit(1);

    if (existingSubscription.length === 0) {
      return NextResponse.json(
        { error: "Subscription not found or you do not have permission" },
        { status: 404 }
      );
    }

    const updatedSubscription = await db
      .update(subscription)
      .set({ status: status })
      .where(eq(subscription.id, subscriptionId))
      .returning();
    console.log("Updated subscription:", updatedSubscription);
    return NextResponse.json(updatedSubscription[0]);
  } catch (error) {
    console.error("Failed to update subscription status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
