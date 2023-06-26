import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
import authLogin from "../login/authLogin";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongoose/mongodbAdapter";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const result = await authLogin(email, password);
        if (!result.err) {
          const user = {
            email: result.email,
            username: result.username,
            image: result.imgURL,
          };

          return {
            email: result.email,
            name: result.username,
            image: result.imgURL,
          };
        } else {
          throw new Error("Invalid Login Creds");
          // return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
