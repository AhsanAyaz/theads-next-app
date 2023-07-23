import { getServerSessionForNext13 } from "@/app/lib/getServerSession";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSessionForNext13();
  if (!session || !session.user) {
    throw new Error("Not authorized");
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session.user?.email,
    },
  });
  return NextResponse.json({
    user,
  });
};
