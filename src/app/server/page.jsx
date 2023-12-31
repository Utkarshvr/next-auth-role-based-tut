import UserCard from "@/components/UserCard/UserCard";
import { authOptions } from "../api/auth/[...nextauth]/(config)/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function ServerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} pagetype={"Server"} />
    </section>
  );
}
