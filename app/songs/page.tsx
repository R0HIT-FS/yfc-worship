// import Link from "next/link";

// async function getSongs() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/songs`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch songs");
//   }

//   return res.json();
// }


//   export const metadata = {
//     title : "Library - Worship Flow"
// }

// export default async function SongsPage() {
//   const songs = await getSongs();

//   return (
//     <div className="w-full p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold">
//           Songs
//         </h1>

//         <Link
//           href="/songs/new"
//           className="bg-black text-white px-4 py-2 rounded-md"
//         >
//           Add Song
//         </Link>
//       </div>

//       <div className="space-y-4">
//         {songs.map((song: any) => (
//           <Link
//             key={song._id}
//             href={`/songs/${song._id}`}
//             className="block border rounded-lg p-4 hover:bg-gray-50 transition"
//           >
//             <h2 className="font-semibold text-lg">
//               {song.title}
//             </h2>

//             {song.key && (
//               <p className="text-sm text-gray-500">
//                 Key: {song.key}
//               </p>
//             )}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }



// import Link from "next/link";

// import SongsList from "@/components/SongsList";

// async function getSongs() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/songs`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error(
//       "Failed to fetch songs"
//     );
//   }

//   return res.json();
// }

// export const metadata = {
//   title: "Library - Worship Flow",
// };

// export default async function SongsPage() {
//   const songs = await getSongs();

//   return (
//     <div className="w-full p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold">
//           Songs
//         </h1>

//         <Link
//           href="/songs/new"
//           className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
//         >
//           Add Song
//         </Link>
//       </div>

//       <SongsList songs={songs} />
//     </div>
//   );
// }


// app/songs/page.tsx

import Link from "next/link";

import SongsList from "@/components/SongsList";

async function getSongs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/songs`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch songs");
  }

  return res.json();
}

export const metadata = {
  title: "Library - Worship Flow",
};

export default async function SongsPage() {
  const songs = await getSongs();

  return (
    <main className="w-full p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Songs
        </h1>

        <Link
          href="/songs/new"
          prefetch={false}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
        >
          Add Song
        </Link>
      </div>

      <SongsList songs={songs} />
    </main>
  );
}