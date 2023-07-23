import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import prisma from "./prisma";
import { User } from "@prisma/client";

export async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }
  const user = prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });
  return user;
}
