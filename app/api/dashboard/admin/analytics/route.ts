// app/api/dashboard/admin/analytics/route.ts
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/index";
import { user, subscription } from "@/db/schema";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { and, eq, gte, lte, lt, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const startParam = url.searchParams.get("startDate");
  const endParam = url.searchParams.get("endDate");
  const startDate = startParam ? new Date(startParam) : null;
  const endDate = endParam ? new Date(endParam) : null;
  if ((startParam && (!startDate || isNaN(startDate.getTime()))) || (endParam && (!endDate || isNaN(endDate.getTime())))) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  let prevStart: Date | null = null;
  let prevEnd: Date | null = null;
  if (startDate && endDate) {
    const diff = endDate.getTime() - startDate.getTime();
    prevEnd = new Date(startDate.getTime() - 1);
    prevStart = new Date(prevEnd.getTime() - diff);
  }


  const inRange = (col: any, s: Date, e: Date) => and(gte(col, s), lte(col, e));

  const [{ sum: revenueCurrent }] = await db
    .select({ sum: sql`coalesce(sum(${subscription.totalPrice}), 0)::bigint` })
    .from(subscription)
    .where(startDate && endDate ? inRange(subscription.createdAt, startDate, endDate) : sql`TRUE`)
    .execute();
  const [{ sum: revenuePrevious }] = await db
    .select({ sum: sql`coalesce(sum(${subscription.totalPrice}), 0)::bigint` })
    .from(subscription)
    .where(prevStart && prevEnd ? inRange(subscription.createdAt, prevStart, prevEnd) : sql`TRUE`)
    .execute();
  const revCurr = Number(revenueCurrent);
  const revPrev = Number(revenuePrevious);
  const revenueChange = revPrev ? ((revCurr - revPrev) / revPrev) * 100 : 0;

  const mrrCurrent = revCurr;
  const mrrPrevious = revPrev;
  const mrrChange = revenueChange;


  const [{ count: totalUsers }] = await db
    .select({ count: sql`count(*)::bigint` })
    .from(user)
    .execute();
  const [{ count: newUsers }] = await db
    .select({ count: sql`count(*)::bigint` })
    .from(user)
    .where(startDate && endDate ? inRange(user.createdAt, startDate, endDate) : sql`TRUE`)
    .execute();
  const [{ count: prevNewUsers }] = await db
    .select({ count: sql`count(*)::bigint` })
    .from(user)
    .where(prevStart && prevEnd ? inRange(user.createdAt, prevStart, prevEnd) : sql`TRUE`)
    .execute();
  const [{ count: activeUsers }] = await db
    .select({ count: sql`count(distinct ${subscription.userId})::bigint` })
    .from(subscription)
    .where(
      startDate && endDate
        ? and(eq(subscription.status, "active"), inRange(subscription.createdAt, startDate, endDate))
        : eq(subscription.status, "active")
    )
    .execute();
  const usersChange = prevNewUsers ? ((Number(newUsers) - Number(prevNewUsers)) / Number(prevNewUsers)) * 100 : 0;

  const [{ count: totalSubs }] = await db
    .select({ count: sql`count(*)::bigint` })
    .from(subscription)
    .where(startDate && endDate ? inRange(subscription.createdAt, startDate, endDate) : sql`TRUE`)
    .execute();
  const [{ count: activeSubs }] = await db
    .select({ count: sql`count(*)::bigint` })
    .from(subscription)
    .where(startDate && endDate
      ? and(eq(subscription.status, "active"), inRange(subscription.createdAt, startDate, endDate))
      : eq(subscription.status, "active"))
    .execute();
  const [{ count: cancelledSubs }] = await db
    .select({ count: sql`count(*)::bigint` })
    .from(subscription)
    .where(startDate && endDate
      ? and(eq(subscription.status, "cancelled"), inRange(subscription.createdAt, startDate, endDate))
      : eq(subscription.status, "cancelled"))
    .execute();
  const [{ count: prevTotalSubs }] = await db
    .select({ count: sql`count(*)::bigint` })
    .from(subscription)
    .where(prevStart && prevEnd ? inRange(subscription.createdAt, prevStart, prevEnd) : sql`TRUE`)
    .execute();
  const subsGrowth = prevTotalSubs ? ((Number(totalSubs) - Number(prevTotalSubs)) / Number(prevTotalSubs)) * 100 : 0;

  const newSubscriptions = Number(totalSubs);

  let reactivations = 0;
  if (startDate && endDate) {
    const [{ count }] = await db
      .select({ count: sql`count(*)::bigint` })
      .from(subscription)
      .where(
        and(
          eq(subscription.status, "active"),
          gte(subscription.updatedAt, startDate),
          lte(subscription.updatedAt, endDate),
          lt(subscription.createdAt, startDate)
        )
      )
      .execute();
    reactivations = Number(count);
  }


  const mealsDelivered = 0;
  const mealsPending = 0;
  const mealsChange = 0;

  return NextResponse.json({
    revenue: { current: revCurr, previous: revPrev, change: parseFloat(revenueChange.toFixed(1)) },
    mrr: { current: mrrCurrent, previous: mrrPrevious, change: parseFloat(mrrChange.toFixed(1)) },
    users: { total: Number(totalUsers), new: Number(newUsers), active: Number(activeUsers), change: parseFloat(usersChange.toFixed(1)) },
    subscriptions: {
      total: Number(totalSubs),
      active: Number(activeSubs),
      cancelled: Number(cancelledSubs),
      change: parseFloat(subsGrowth.toFixed(1)),
      newSubscriptions,
      reactivations,
      growth: parseFloat(subsGrowth.toFixed(1)),
    },
    meals: { delivered: mealsDelivered, pending: mealsPending, change: mealsChange },
  });
}
