"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  if (status === "loading")
    return <h2 className="font-bold text-xl mb-2">Loading...</h2>;

  if (status === "authenticated") {
    router.push("/");
    return <h2 className="font-bold text-xl mb-2">Redirecting...</h2>;
  }

  const handleLoginWithCreds = (e) => {
    e.preventDefault();
    console.log(e.target);
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  };
  return (
    <div className="w-fit p-5 rounded-md bg-zinc-950 flex flex-col items-center justify-center">
      <h2 className="font-bold text-xl mb-2">Login</h2>
      <form
        onSubmit={handleLoginWithCreds}
        className="flex flex-col gap-2 items-center justify-center mb-2"
      >
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
        <button className="rounded-md py-1 px-2 bg-zinc-800 font-bold uppercase">
          Login
        </button>
      </form>
      <span className="p-3">- OR -</span>
      <div className="flex flex-col gap-2 mb-3">
        <button
          onClick={() => signIn("linkedin")}
          className="rounded-md py-1 px-2 bg-blue-600 font-bold uppercase"
        >
          Sign in with Linkedin
        </button>
        <button
          onClick={() => signIn("github")}
          className="rounded-md py-1 px-2 bg-red-600 font-bold uppercase"
        >
          Sign in with Github
        </button>
      </div>
      <Link className="text-gray-400 font-medium" href="/auth/signup">
        Create a new account
      </Link>
    </div>
  );
}
