import { Comment, User } from "@prisma/client";

export type CommentWithUser = Comment & {
  user: User;
  _count: {
    children: number;
  };
};
