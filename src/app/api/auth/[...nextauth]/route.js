// All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.
import NextAuth from "next-auth";
import { authOptions } from "./(config)/options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
