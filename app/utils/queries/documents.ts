"use server";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";

import { InputJsonValue } from "@prisma/client/runtime/library";
import { auth } from "@clerk/nextjs/server";

export async function createDocument(data: any) {
  try {
    console.log("✅ - running");
    const { userId } = auth();
    const file = await db.file.create({
      data: {
        name: data.name,
        url: data.url,
        userId: userId as string,
        date: data.date,
        summary: data.summary as InputJsonValue | undefined,
      },
    });
    console.log("file", file);
    revalidatePath("/");

    return { ok: true };
  } catch (error: any) {
    console.log("🔴 - ", error.message);
    return { error };
  }
}

export async function updateDocument(
  id: string,
  data: InputJsonValue | undefined
) {
  try {
    if (!data) {
      return;
    }
    const updatedFile = await db.file.update({
      where: { id },
      data: {
        summary: data,
      },
    });

    return { file: updatedFile };
  } catch (error: any) {
    console.log("🔴 - ", error.message);
    return { error };
  }
}

export async function getDocuments(userId: string) {
  try {
    const documents = await db.file.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    });
    console.log("doc", documents);
    return documents;
  } catch (error: any) {
    console.log("🔴 - ", error.message);
    return { error };
  }
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
