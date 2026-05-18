// import DeleteSetlistButton from "@/components/DeleteSetlistButton";
// import Link from "next/link";

//   export const metadata = {
//     title : "Setlist Details - Worship Flow"
// }

// async function getSetlist(id: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/setlists/${id}`,
//     {
//       cache: "no-store",
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
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const setlist = await getSetlist(id);

//   return (
//     <div className="w-full p-6">
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <h1 className="text-4xl font-bold">{setlist.title}</h1>

//           {setlist.leaders?.length > 0 && (
//             <p className="text-gray-500 mt-3">
//               Leaders: {setlist.leaders.join(", ")}
//             </p>
//           )}
//         </div>

//         <div className="flex gap-3">
//           <Link
//             href={`/setlists/${setlist._id}/edit`}
//             className="border px-4 py-2 rounded-md"
//           >
//             Edit
//           </Link>

//           <DeleteSetlistButton id={setlist._id} />
//         </div>
//       </div>

//       <div className="mt-8 space-y-4">
//         {setlist.songs.map((song: any, index: number) => (
//           <Link
//             key={song._id}
//             href={`/songs/${song._id}`}
//             className="block border rounded-lg p-4 hover:bg-gray-50 transition"
//           >
//             <p className="text-sm text-gray-500">Song {index + 1}</p>

//             <h2 className="text-xl font-semibold">{song.title}</h2>

//             {song.key && (
//               <p className="text-sm text-gray-500 mt-1">Key: {song.key}</p>
//             )}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }


import DeleteSetlistButton from "@/components/DeleteSetlistButton";
import Link from "next/link";

export const metadata = {
  title: "Setlist Details - Worship Flow",
};

async function getSetlist(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/setlists/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch setlist");
  }

  return res.json();
}

export default async function SetlistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const setlist = await getSetlist(id);

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-sm md:text-4xl font-bold">
            {setlist.title}
          </h1>

          {setlist.leaders?.length > 0 && (
            <p className="text-xs md:text-lg text-gray-500 mt-2">
              Leaders: {setlist.leaders.join(", ")}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Link
            href={`/setlists/${setlist._id}/edit`}
            className="border text-sm md:text-md px-2 py-1 rounded-md"
          >
            Edit
          </Link>

          <DeleteSetlistButton id={setlist._id} />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {setlist.songs.map(
          (song: any, index: number) => (
            <Link
              key={song._id}
              href={`/songs/${song._id}`}
              className="block border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-zinc-900 transition"
            >
              <p className="text-sm text-gray-500">
                Song {index + 1}
              </p>

              <h2 className="text-xl font-semibold">
                {song.title}
              </h2>

              {song.key && (
                <p className="text-sm text-gray-500 mt-1">
                  Key: {song.key}
                </p>
              )}
            </Link>
          )
        )}
      </div>
    </div>
  );
}