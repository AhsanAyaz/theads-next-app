import { THREADS_LIST } from "@/app/dummy_data";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
  const thread = THREADS_LIST.find((thr) => {
    return thr.id === Number(id);
  });
  return {
    title: `Comment by ${thread?.by}`,
  }
}

export default function TheadDetailPage({ params }: Props) {
  const thread = THREADS_LIST.find((thr) => {
    return thr.id === Number(params.id);
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl mb-4">Single Thread Page</h1>
      {thread && (
        <div
          className="bg-white rounded-md p-4 mb-4 text-slate-900"
          key={thread.id}
        >
          <h2>{thread.text}</h2>
          <h3>{thread.by}</h3>
        </div>
      )}
    </main>
  );
}
