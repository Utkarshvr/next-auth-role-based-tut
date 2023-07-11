"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      console.log(res);
      res.ok && router.push("/auth/login");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-fit p-5 rounded-md bg-zinc-950 flex flex-col items-center justify-center">
      <h2 className="font-bold text-xl mb-1">Signup</h2>
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-2 items-center justify-center"
      >
        <input
          className="rounded-md p-2 w-[300px] min-w-0 bg-zinc-800 font-semibold"
          type="text"
          placeholder="Username"
          required
        />
        <input
          className="rounded-md p-2 w-[300px] min-w-0 bg-zinc-800 font-semibold"
          type="email"
          placeholder="Email"
          required
        />
        <input
          className="rounded-md p-2 w-[300px] min-w-0 bg-zinc-800 font-semibold"
          type="password"
          placeholder="Password"
          required
        />
        <button
          disabled={loading}
          type="submit"
          className="rounded-md py-1 px-2 bg-sky-700 font-bold uppercase"
        >
          Signup
        </button>
      </form>
      {error && "Something went wrong!"}
      <span className="p-3">- OR -</span>
      <Link className="text-gray-400 font-medium" href="/auth/login">
        Login with an existing account
      </Link>
    </div>
  );
}
