import { auth } from "./auth";
import { headers } from "next/headers";

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export function isAdmin(user: any): boolean {
  return user?.role === "admin";
}

export function hasRole(user: any, role: string): boolean {
  return user?.role === role;
}
