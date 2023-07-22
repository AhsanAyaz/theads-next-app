import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { UserProfileImg } from "./components/UserProfileImg";
import { getCurrentUser } from "./lib/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads Next App",
  description: "Worked upon by the CodeWithAhsan community",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-indigo-600 text-white h-14 px-3 py-1.5 flex items-center">
          <nav className="w-full flex items-center justify-between">
            <span>Threads Next App</span>
            <span className="flex items-center gap-4">
              <ul className="flex gap-4 items-center">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
              </ul>
              <UserProfileImg user={user} />
            </span>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
