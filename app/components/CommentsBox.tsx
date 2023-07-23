'use client'
import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { CommentWithUser } from "../lib/types";
import { Comment, User } from "@prisma/client";
import CommentComponent from "./Comment";

type Props = {
  comments: CommentWithUser[];
  user: User | null;
};

const CommentsBox = ({ comments: renderedComments, user }: Props) => {
  const [comments, setComments] = useState<CommentWithUser[]>(renderedComments);
  const onFormSubmit = async (text: string) => {
    const params: Partial<Comment> = {
      text,
      userId: user!.id
    }
    const resp = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(params)
    });
    const { comment } = (await resp.json());
    setComments([comment, ...comments]);
  }
  return (
    <>
      {!!user && (
        <section>
          <CommentForm
            placeholder="Write something..."
            buttonText="Submit"
            onFormSubmit={onFormSubmit}
          />
        </section>
      )}
      <section className="flex flex-col gap-4">
        {comments.map((comment) => {
          return (
            <CommentComponent user={user} key={comment.id} comment={comment} />
          );
        })}
      </section>
    </>
  );
};

export default CommentsBox;
