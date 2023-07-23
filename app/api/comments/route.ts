import { getServerSessionForNext13 } from "@/app/lib/getServerSession";
import prisma from "@/app/lib/prisma";
import { Comment } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    let comments: Comment[];
    const searchParams = new URL(req.url).searchParams;
    const parentId = searchParams.get("parentId");
    comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        parentId: parentId
          ? parentId
          : {
              not: {
                isSet: true,
              },
            },
      },
      include: {
        user: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
        _count: {
          select: {
            children: true,
          },
        },
      },
    });
    return NextResponse.json({
      comments,
    });
  } catch (e) {
    console.log("error happened during GET /api/comments", {
      error: e,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSessionForNext13();
    if (!session?.user) {
      return NextResponse.json({
        error: "Not authenticated",
      });
    }
    const requestBody = await req.json();
    const newComment: Omit<Comment, "id"> = requestBody;
    const comment = await prisma.comment.create({
      data: {
        ...newComment,
      },
      include: {
        user: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
        _count: {
          select: {
            children: true,
          },
        },
      },
    });
    return NextResponse.json({
      comment,
    });
  } catch (e) {
    console.log("error happened during GET /api/comments", {
      error: e,
    });
  }
};
