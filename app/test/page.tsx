"use client";
import React from "react";
import { signIn } from "next-auth/react";

function Test() {
  return (
    <div className="">
      Test
      <button className="bg-white text-black" onClick={() => signIn("google")}>
        Click Me😉
      </button>
    </div>
  );
}

export default Test;
