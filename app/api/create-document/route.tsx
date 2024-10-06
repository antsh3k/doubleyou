import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const user = await db.user.findUnique({
      where: {
        clerkId: userId as string,
      },
    });
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const file = await db.file.create({
      data: {
        name: data.name,
        url: data.images,
        userId: user?.id as string,
        date: new Date(data.date),
        summary: JSON.stringify(data.summary) as InputJsonValue | undefined,
      },
    });

    console.log("file", file);
    revalidatePath("/");

    return NextResponse.json({ ok: true, file }, { status: 201 });
  } catch (error: any) {
    console.error("🔴 - ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
