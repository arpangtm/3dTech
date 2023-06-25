"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

function login() {
  const { data: session, status } = useSession();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { push } = useRouter();
  const [err, setError] = useState("");
  if (session) {
    push("/");
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res?.error) push("/");
    else setError(res.error);
  }
  return (
    <div className="flex flex-col items-center mt-20 space-y-8">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80"
        onSubmit={handleSubmit}
      >
        {err ? (
          <p className="text-red-700 text-center mb-5">Invalid Credentials</p>
        ) : null}
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 text-gray-700`}>
            Email
          </label>
          <input
            className={`shadow text-gray-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-6">
          <label className={`block text-sm font-bold mb-2 text-gray-700`}>
            Password{" "}
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <p className="text-red-500 text-xs italic hidden">
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <p className="text-center text-gray-500 text-xs mt-9">
          &copy;2023 E Corp. All rights reserved.
        </p>
      </form>
      <div>
        <a
          onClick={() => {
            prompt("Googliee");
            signIn("google");
          }}
        >
          <Image
            className="w-60 rounded-lg cursor-pointer"
            width={400}
            height={350}
            alt="googleimg"
            src="/google_btn (2).png"
          ></Image>
        </a>
      </div>
    </div>
  );
}

export default login;
