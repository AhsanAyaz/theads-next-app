import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const provider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
});

export const authOptions: NextAuthOptions = {
  providers: [provider],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
