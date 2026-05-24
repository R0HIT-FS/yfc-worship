// // import DeleteSetlistButton from "@/components/DeleteSetlistButton";
// // import Link from "next/link";

// //   export const metadata = {
// //     title : "Setlist Details - Worship Flow"
// // }

// // async function getSetlist(id: string) {
// //   const res = await fetch(
// //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/setlists/${id}`,
// //     {
// //       cache: "no-store",
// //     },
// //   );

// //   if (!res.ok) {
// //     throw new Error("Failed to fetch setlist");
// //   }

// //   return res.json();
// // }

// // export default async function SetlistPage({
// //   params,
// // }: {
// //   params: Promise<{ id: string }>;
// // }) {
// //   const { id } = await params;

// //   const setlist = await getSetlist(id);

// //   return (
// //     <div className="w-full p-6">
// //       <div className="flex items-start justify-between gap-4">
// //         <div>
// //           <h1 className="text-4xl font-bold">{setlist.title}</h1>

// //           {setlist.leaders?.length > 0 && (
// //             <p className="text-gray-500 mt-3">
// //               Leaders: {setlist.leaders.join(", ")}
// //             </p>
// //           )}
// //         </div>

// //         <div className="flex gap-3">
// //           <Link
// //             href={`/setlists/${setlist._id}/edit`}
// //             className="border px-4 py-2 rounded-md"
// //           >
// //             Edit
// //           </Link>

// //           <DeleteSetlistButton id={setlist._id} />
// //         </div>
// //       </div>

// //       <div className="mt-8 space-y-4">
// //         {setlist.songs.map((song: any, index: number) => (
// //           <Link
// //             key={song._id}
// //             href={`/songs/${song._id}`}
// //             className="block border rounded-lg p-4 hover:bg-gray-50 transition"
// //           >
// //             <p className="text-sm text-gray-500">Song {index + 1}</p>

// //             <h2 className="text-xl font-semibold">{song.title}</h2>

// //             {song.key && (
// //               <p className="text-sm text-gray-500 mt-1">Key: {song.key}</p>
// //             )}
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import Link from "next/link";

// import DeleteSetlistButton from "@/components/DeleteSetlistButton";

// export const metadata = {
//   title: "Setlist Details - Worship Flow",
// };

// type Song = {
//   _id: string;
//   title: string;
//   key?: string;
// };

// type Setlist = {
//   _id: string;
//   title: string;
//   leaders?: string[];
//   songs: Song[];
// };

// async function getSetlist(id: string): Promise<Setlist> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/setlists/${id}`,
//     {
//       cache: "force-cache",
//       next: {
//         revalidate: 60,
//       },
//     },
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch setlist");
//   }

//   return res.json();
// }

// export default async function SetlistPage({
//   params,
// }: {
//   params: Promise<{
//     id: string;
//   }>;
// }) {
//   const { id } = await params;

//   const setlist = await getSetlist(id);

//   return (
//     <main className="w-full p-4 md:p-6">
//       <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//         <div className="min-w-0">
//           <h1 className="line-clamp-2 text-2xl font-bold tracking-tight md:text-4xl">
//             {setlist.title}
//           </h1>

//           {!!setlist.leaders?.length && (
//             <p className="mt-2 text-sm text-gray-500 md:text-base">
//               Leaders: {setlist.leaders.join(", ")}
//             </p>
//           )}
//         </div>

//         <div className="flex shrink-0 gap-2">
//           <Link
//             href={`/setlists/${setlist._id}/edit`}
//             prefetch={false}
//             className="rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
//           >
//             Edit
//           </Link>

//           <DeleteSetlistButton id={setlist._id} />
//         </div>
//       </section>

//       {setlist.songs?.length === 0 ? (
//         <p className="py-16 text-center text-muted-foreground">
//           No songs in this setlist
//         </p>
//       ) : (
//         <section className="mt-8 space-y-3">
//           {setlist.songs.map((song, index) => (
//             <Link
//               key={song._id}
//               href={`/songs/${song._id}`}
//               className="block rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-900"
//             >
//               <article>
//                 <p className="text-sm text-gray-500">Song {index + 1}</p>

//                 <h2 className="line-clamp-1 text-lg font-semibold md:text-xl">
//                   {song.title}
//                 </h2>

//                 {song.key && (
//                   <p className="mt-1 text-sm text-gray-500">Key: {song.key}</p>
//                 )}
//               </article>
//             </Link>
//           ))}
//         </section>
//       )}
//     </main>
//   );
// }



// app/setlists/[id]/page.tsx

import Link from "next/link";
import { cache } from "react";

import DeleteSetlistButton from "@/components/DeleteSetlistButton";
import SortableSongsList from "@/components/SortableSongsList";

export const metadata = {
  title: "Setlist Details - Worship Flow",
};

export type Song = {
  _id: string;
  title: string;
  key?: string;
};

type Setlist = {
  _id: string;
  title: string;
  leaders?: string[];
  songs: Song[];
};

const getSetlist = cache(
  async (
    id: string,
  ): Promise<Setlist> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/setlists/${id}`,
      {
        next: {
          revalidate: 300,
        },
      },
    );

    if (!res.ok) {
      throw new Error(
        "Failed to fetch setlist",
      );
    }

    return res.json();
  },
);

export default async function SetlistPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const setlist =
    await getSetlist(id);

  return (
    <main className="w-full p-4 md:p-6">
      <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="line-clamp-2 text-3xl font-bold tracking-tight md:text-4xl">
            {setlist.title}
          </h1>

          {!!setlist.leaders
            ?.length && (
            <p className="mt-3 text-sm text-gray-500 md:text-base">
              Leaders:{" "}
              {setlist.leaders.join(
                ", ",
              )}
            </p>
          )}
        </div>

        <div className="flex shrink-0 gap-2">
          <Link
            href={`/setlists/${setlist._id}/edit`}
            prefetch={false}
            className="rounded-md border px-4 py-2 text-sm transition-colors hover:bg-muted"
          >
            Edit
          </Link>

          <DeleteSetlistButton
            id={setlist._id}
          />
        </div>
      </section>

      {!setlist.songs
        ?.length ? (
        <p className="py-16 text-center text-muted-foreground">
          No songs in this
          setlist
        </p>
      ) : (
        <SortableSongsList
          songs={setlist.songs}
          setlistId={setlist._id}
        />
      )}
    </main>
  );
}