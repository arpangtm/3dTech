"use client";
import Header from "./Components/Header";
import FrontPage from "./Components/FrontPage";
import { getSession } from "next-auth/react";

export default function Home({ session }: any) {
  console.log(session);
  return (
    <>
      <Header></Header>
      <FrontPage></FrontPage>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  console.log("ServerSideProps");
  const session = await getSession(ctx);
  console.log("Session", session);
  if (!session) {
    return {
      props: {
        session: "No session",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
