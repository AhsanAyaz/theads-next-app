import Link from "next/link";
import { THREADS_LIST } from "../dummy_data";

type Props = {
  searchParams: {
    text: string;
  }
}

export const metadata = {
  title: 'Threads List',
}

export default function ThreadsPage({searchParams}: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-5xl mb-4'>Thread List</h1>
      {
        searchParams.text && <p>Search Term = {searchParams.text}</p>
      }
      <ul>
        {
          THREADS_LIST.filter((thread) =>{
            if (!searchParams.text) {
              return true;
            }
            return thread.text.toLowerCase().includes(
              searchParams.text.toLowerCase()
            );
          } ).map(thread => {
            return <li className="bg-white rounded-md mb-4 text-slate-900" key={thread.id}>
              <Link className="p-4 block" href={`/threads/${thread.id}`}>
                <h2>{thread.text}</h2>
                <h3>{thread.by}</h3>
              </Link>
            </li>
          })
        }
      </ul>
    </main>
  )
}
