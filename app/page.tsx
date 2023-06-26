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
