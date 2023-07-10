export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-5">
      <h1 className="text-3xl font-bold">To login as:</h1>
      <p className="flex flex-col gap-2 text-lg font-semibold">User:</p>
      <code>
        {JSON.stringify({
          name: "User",
          email: "user@gmail.com",
          password: "password",
        })}
      </code>
      <p className="flex flex-col gap-2 text-lg font-semibold">Manager:</p>
      <code>
        {JSON.stringify({
          name: "Manager",
          email: "manager@gmail.com",
          password: "password",
        })}
      </code>
      <p className="flex flex-col gap-2 text-lg font-semibold">Admin:</p>

      <code>
        {JSON.stringify({
          name: "Administrator",
          email: "admin@gmail.com",
          password: "password",
        })}
      </code>
    </main>
  );
}
