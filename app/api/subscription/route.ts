import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/index";
import { subscription } from "@/db/schema";
import { headers } from "next/headers";
import { auth } from "@/utils/auth";

const bodySchema = z.object({
  plan: z.enum(["diet", "protein", "royal"]),
  mealTypes: z.array(z.string()),
  deliveryDays: z.array(z.string()),
  allergies: z.string().optional(),
  totalPrice: z.number().int(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = bodySchema.parse(json);

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const result = await db.insert(subscription).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      plan: data.plan,
      mealTypes: data.mealTypes,
      deliveryDays: data.deliveryDays,
      allergies: data.allergies ?? null,
      totalPrice: data.totalPrice,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    const message =
      err instanceof z.ZodError
        ? err.issues.map((i) => i.message).join("; ")
        : "Internal Server Error";
    return NextResponse.json({ message }, { status: 400 });
  }
}
