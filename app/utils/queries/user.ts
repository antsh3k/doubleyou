"use server";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";

import { User } from "@prisma/client";

export async function createUser(
  data: Omit<User, "id" | "createdAt" | "updatedAt">
) {
  try {
    const user = await db.user.upsert({
      where: { clerkId: data.clerkId },
      update: data,
      create: data,
    });
    revalidatePath("/");

    return { user };
  } catch (error: any) {
    console.log("🔴 - ", error.message);
    return { error };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return { error };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return { error };
  }
}
