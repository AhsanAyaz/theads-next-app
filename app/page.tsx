
import CommentsBox from "./components/CommentsBox";
import { getCurrentUser } from "./lib/session";
import { CommentWithUser } from "./lib/types";

const getComments = async () => {
  const resp = await fetch(`${process.env.NEXT_BASE_URL}/api/comments`);
  const { comments } = (await resp.json());
  return comments;
}

export default async function Home() {
  const user = await getCurrentUser();
  const comments: CommentWithUser[] = await getComments();

  return (
    <main className="flex min-h-screen gap-4 flex-col items-center justify-between p-24">
      <h1 className="text-2xl">Welcome to Threads App</h1>
      <CommentsBox comments={comments} user={user} />
    </main>
  );
}
