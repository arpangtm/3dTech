"use client";
import Hero from "@/app/Components/Hero";
import FrontPage from "./Components/FrontPage";
import { getSession } from "next-auth/react";
import ProductShowcase from "./Components/FeaturedProduct";
import Features from "./Components/Features";

export default function Home({ session }: any) {
  console.log(session);
  return (
    <>
      <Hero />
      <ProductShowcase />
      <Features />
      <FrontPage />
    </>
  );
}
