'use client'
import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { CommentWithUser } from '../lib/types'
import Image from 'next/image'
import { Comment, User } from '@prisma/client'
import CommentForm from './CommentForm'

type Props = {
  comment: CommentWithUser,
  user: User | null
}

const CommentComponent = ({comment, user}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replies, setReplies] = useState<CommentWithUser[]>([]);
  const [childrenCount, setChildrenCount] = useState(comment._count.children);
  const toggleReplying = () => {
    if (!user) {
      return signIn();
    }
    if (!isReplying) {
      setIsExpanded(true);
    }
    setIsReplying(!isReplying);
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  const createNestedComment = async (text: string) => {
    const params: Partial<Comment> = {
      text,
      userId: user!.id,
      parentId: comment.id
    }
    const resp = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(params)
    });
    const { comment: createdComment } = (await resp.json());
    const newRepliesState = [createdComment, ...replies];
    setReplies(newRepliesState);
    setChildrenCount(newRepliesState.length);
  }

  const getNestedComments = async () => {
    const resp = await fetch(`/api/comments?parentId=${comment.id}`);
    const respBody = await resp.json();
    const comments = respBody.comments;
    setReplies(comments);
  }

  useEffect(() => {
    if (isExpanded && childrenCount > 0) {
      getNestedComments();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, childrenCount])

  const commentUser = comment.user;

  return (
    <article className="shadow-md relative block overflow-hidden rounded-lg border bg-white dark:bg-transparent border-gray-200 p-4 sm:p-6 lg:p-8">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div className="flex items-center gap-4">
          {commentUser.image ? (
            <Image
              src={commentUser.image}
              width={32}
              height={32}
              className="rounded-full"
              alt={`avatar for ${commentUser.name}`}
            />
          ) : null}
          <h3 className="font-bold text-gray-900 dark:text-white">
            {comment.user.name}
          </h3>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {comment.text}
        </p>
      </div>

      <dl className="mt-6 flex justify-end gap-4 sm:gap-6">
        <button
          onClick={toggleReplying}
          className="inline-block rounded border border-current px-4 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300 transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-indigo-500"
        >
          Reply
        </button>

        <button>12 Likes</button>
        {childrenCount > 0 && (
          <button
            onClick={toggleExpanded}
            className={`duration-200 ${isExpanded ? "rotate-180" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        )}
      </dl>
      {!!user && isReplying && (
        <section className='mt-4'>
          <CommentForm
            placeholder="Write something..."
            buttonText="Submit"
            onFormSubmit={createNestedComment}
          />
        </section>
      )}
      {isExpanded && (
        <section className="p-4 flex flex-col gap-4">
          {replies.map((reply) => {
            return (
              <CommentComponent user={user} key={reply.id} comment={reply} />
            );
          })}
        </section>
      )}
    </article>
  );
}

export default CommentComponent