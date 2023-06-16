import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // pages:{
  //   signIn:"/test/"
  // }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextRequest } from "next/server";
// import authLogin from "../login/authLogin";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     // CredentialsProvider({
//     //   name: "Credentials",
//     //   credentials: {},
//     //   async authorize(credentials, req) {
//     //     const { email, password } = credentials as {
//     //       email: string;
//     //       password: string;
//     //     };
//     //     const result = await authLogin(email, password);
//     //     if (result.err) {
//     //       throw new Error("Invvalid Login Creds");
//     //     } else {
//     //       return result;
//     //     }

//     //   },
//     // }),
//   ],
//   pages: {
//     error: "/",
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
