// src/app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { db } from "@/index";
import { user, subscription } from "@/db/schema";

export async function GET() {
  try {
    const usersData = await db.select().from(user);

    const subscriptionsData = await db.select().from(subscription);

    const usersWithSubscriptionData = usersData.map((u) => {
      const userSubscriptions = subscriptionsData.filter(
        (s) => s.userId === u.id
      );

      const totalSpent = userSubscriptions.reduce(
        (sum, s) => sum + s.totalPrice,
        0
      );

      return {
        name: u.name,
        email: u.email,
        role: u.role,
        subscriptions: userSubscriptions.length,
        totalSpent,
      };
    });

    return NextResponse.json(usersWithSubscriptionData);
  } catch (error) {
    console.error("Error fetching admin users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}