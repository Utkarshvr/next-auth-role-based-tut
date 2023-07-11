"use client";
// Remember you must use an AuthProvider for
// client components to useSession
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserCard from "@/components/UserCard/UserCard";

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  // Implement the following through middleware
  // if (session?.user?.role !== "admin" && session?.user?.role !== "manager")
  //   return <h1 className="text-5xl font-bold">Access Denied</h1>;

  // console.log({ session });

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} pagetype={"Client"} />
    </section>
  );
}
