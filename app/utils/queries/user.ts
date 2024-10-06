"use server";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function createUser(data: any) {
  try {
    const user = await db.user.create({
      data: { clerkId: data.user_id, email: data.email },
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
        clerkId: id,
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
