"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

function signup() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const { push } = useRouter();
  const [err, setError] = useState<{
    username_err: any;
    password_err: any;
    email_err: any;
  }>({ username_err: "", password_err: "", email_err: "" });
  if (session) {
    redirect("/");
  }
  console.log(email);
  async function handelSubmit(e: any) {
    console.log("Submitting..");
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("file", photo!);

    console.log(formData);
    const result = await fetch("/api/auth/signup", {
      method: "POST",
      body:formData
      // body: JSON.stringify({ username, email, password,img:formData }),
    });

    const data = await result.json();
    console.log(data);
    if (data.err) {
      const err = data;
      if (err.type === "email") setError({ ...err, email_err: err.err });
      else if (err.type === "password")
        setError({ ...err, password_err: err.err });
      else if (err.type === "username")
        setError({ ...err, username_err: err.err });
    } else {
      push("/");
    }
  }
  return (
    <div className="flex flex-col items-center mt-20 space-y-8">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80"
        onSubmit={handelSubmit}
      >
        <div className="mb-4">
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 ${
              err.username_err ? "text-red-700" : "text-gray-700"
            }`}
          >
            Username<span className="font-light">&nbsp;{err.username_err}</span>
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              err.username_err ? "border-red-700" : ""
            }`}
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="mb-4">
          <label
            className={`block text-sm font-bold mb-2 ${
              err.email_err ? "text-red-700" : "text-gray-700"
            }`}
          >
            Email <span className="font-light">&nbsp;{err.email_err}</span>
          </label>
          <input
            className={`shadow text-gray-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
              err.email_err ? "border-red-700" : ""
            }`}
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-6">
          <label
            className={`block text-sm font-bold mb-2 ${
              err.password_err ? "text-red-700" : "text-gray-700"
            }`}
          >
            Password{" "}
            <span className="font-light">&nbsp;{err.password_err}</span>
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              err.password_err ? "border-red-700" : ""
            }`}
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
        <div className="mb-6">
          <label
            className={`block text-sm font-bold mb-2 ${
              err.password_err ? "text-red-700" : "text-gray-700"
            }`}
          >
            Upload Photo
          </label>
          <input
            accept="image/png, image/jpeg"
            required={true}
            type="file"
            name="photo"
            className=""
            onChange={(e: any) => {
              console.log(e.target.files[0]);
              setPhoto(e.target.files[0]);
            }}
          ></input>
          {photo && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(photo)}
              />
              <br />
              <button onClick={() => setPhoto(null)}>Remove</button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <p className="text-center text-gray-500 text-xs mt-9">
          &copy;2023 E Corp. All rights reserved.
        </p>
      </form>
      <div>
        <a
          onClick={() => {
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

export default signup;
