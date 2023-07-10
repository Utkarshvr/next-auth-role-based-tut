// "use client";

// import { signIn, signOut, useSession } from "next-auth/react";

// export default function Header() {
//   const { data: session } = useSession();
//   console.log({ session });
//   return (
//     <nav className="w-full p-2 flex gap-2 items-center justify-between">
//       <div>
//         {session ? (
//           <h4>
//             Hello <span className="text-sky-500"> {session?.user?.name}</span>{" "}
//           </h4>
//         ) : (
//           <h4 className="text-gray-400 font-semibold">You are not signedin</h4>
//         )}
//       </div>
//       <div>
//         {session ? (
//           <button
//             className="bg-red-500 px-3 py-2 rounded-sm"
//             onClick={() => signOut()}
//           >
//             Sign Out
//           </button>
//         ) : (
//           <button
//             className="bg-sky-700 px-4 py-2 rounded-sm"
//             onClick={() => signIn()}
//           >
//             Sign In
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-800 p-4">
      <ul className="flex justify-evenly text-2xl font-bold">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/api/auth/signin">Sign In</Link>
        </li>
        <li>
          <Link href="/api/auth/signout">Sign Out</Link>
        </li>
        <li>
          <Link href="/server">Server</Link>
        </li>
        <li>
          <Link href="/client">Client</Link>
        </li>
        <li>
          <Link href="/extra">Extra</Link>
        </li>
      </ul>
    </nav>
  );
}
