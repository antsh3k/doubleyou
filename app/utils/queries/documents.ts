"use server";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";

import { File } from "@prisma/client";

export async function createDocument(data: File) {
  try {
    const file = await db.file.create({
      data: {
        name: data.name,
        url: data.url,
        userId: data.userId,
        date: data.date,
      },
    });
    revalidatePath("/");

    return { file };
  } catch (error: any) {
    console.log("🔴 - ", error.message);
    return { error };
  }
}

export async function processDocument(id: string, imageUrl: string) {
  //   try {
  //     const file = await db.file.findUnique({
  //       where: {
  //         id,
  //       },
  //     });
  //   } catch (error: any) {
  //     console.log("🔴 - ", error.message);
  //     return { error };
  //   }
}

// export async function getUserById(id: string) {
//   try {
//     const user = await db.user.findUnique({
//       where: {
//         id,
//       },
//     });
//     return user;
//   } catch (error) {
//     return { error };
//   }
// }

// export async function getUserByEmail(email: string) {
//   try {
//     const user = await db.user.findUnique({
//       where: {
//         email,
//       },
//     });
//     return user;
//   } catch (error) {
//     return { error };
//   }
// }
