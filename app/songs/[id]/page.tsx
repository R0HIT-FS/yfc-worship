// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // // import Link from "next/link";

// // // import DeleteSongButton from "@/components/DeleteSongButton";

// // // export const metadata = {
// // //     title : "Song Details - Worship Flow"
// // // }

// // // async function getSong(id: string) {
// // //   const res = await fetch(
// // //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/songs/${id}`,
// // //     {
// // //       cache: "no-store",
// // //     },
// // //   );

// // //   if (!res.ok) {
// // //     throw new Error("Failed to fetch song");
// // //   }

// // //   return res.json();
// // // }

// // // export default async function SongPage({
// // //   params,
// // // }: {
// // //   params: Promise<{ id: string }>;
// // // }) {
// // //   const { id } = await params;

// // //   const song = await getSong(id);

// // //   return (
// // //     <div className="w-full p-6">
// // //       <div className="mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
// // //         <div>
// // //           <h1 className="text-sm md:text-4xl font-bold">{song.title}</h1>

// // //           {song.key && <p className="text-xs md:text-lg text-gray-500 mt-2">Key: {song.key}</p>}
// // //         </div>

// // //         <div className="flex gap-3">
// // //           <Link
// // //             href={`/songs/${song._id}/edit`}
// // //             className="border text-sm md:text-md px-2 py-1 rounded-md"
// // //           >
// // //             Edit
// // //           </Link>

// // //           <DeleteSongButton id={song._id} />
// // //         </div>
// // //       </div>

// // //       <Tabs defaultValue="lyrics">
// // //         <TabsList>
// // //           <TabsTrigger value="lyrics">Lyrics</TabsTrigger>

// // //           <TabsTrigger value="chords">Lyrics With Chords</TabsTrigger>
// // //         </TabsList>

// // //         <TabsContent value="lyrics">
// // //           <div className="border rounded-lg p-6 mt-4 whitespace-pre-wrap">
// // //             {song.lyrics}
// // //           </div>
// // //         </TabsContent>

// // //         <TabsContent value="chords">
// // //           <div className="border rounded-lg p-6 mt-4 whitespace-pre-wrap font-mono">
// // //             {song.lyricsWithChords}
// // //           </div>
// // //         </TabsContent>
// // //       </Tabs>
// // //     </div>
// // //   );
// // // }

// // import Link from "next/link";

// // import {
// //   Tabs,
// //   TabsContent,
// //   TabsList,
// //   TabsTrigger,
// // } from "@/components/ui/tabs";

// // import DeleteSongButton from "@/components/DeleteSongButton";

// // export const metadata = {
// //   title: "Song Details - Worship Flow",
// // };

// // type Song = {
// //   _id: string;
// //   title: string;
// //   key?: string;
// //   lyrics?: string;
// //   lyricsWithChords?: string;
// // };

// // async function getSong(
// //   id: string
// // ): Promise<Song> {
// //   const res = await fetch(
// //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/songs/${id}`,
// //     {
// //       cache: "force-cache",
// //       next: {
// //         revalidate: 60,
// //       },
// //     }
// //   );

// //   if (!res.ok) {
// //     throw new Error(
// //       "Failed to fetch song"
// //     );
// //   }

// //   return res.json();
// // }

// // export default async function SongPage({
// //   params,
// // }: {
// //   params: Promise<{
// //     id: string;
// //   }>;
// // }) {
// //   const { id } = await params;

// //   const song = await getSong(id);

// //   return (
// //     <main className="w-full p-4 md:p-6">
// //        <div className="mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
// //          <div>
// //            <h1 className="text-sm md:text-4xl font-bold">{song.title}</h1>

// //            {song.key && <p className="text-xs md:text-lg text-gray-500 mt-2">Key: {song.key}</p>}
// //          </div>

// //          <div className="flex gap-3">
// //            <Link
// //              href={`/songs/${song._id}/edit`}
// //              className="border text-sm md:text-md px-2 py-1 rounded-md"
// //            >
// //              Edit
// //            </Link>

// //            <DeleteSongButton id={song._id} />
// //          </div>
// //        </div>

// //       <Tabs
// //         defaultValue="lyrics"
// //         // className="w-full"
// //       >
// //         <TabsList className="w-full max-w-md justify-start">
// //           <TabsTrigger value="lyrics">
// //             Lyrics
// //           </TabsTrigger>

// //           <TabsTrigger value="chords">
// //             Lyrics With Chords
// //           </TabsTrigger>
// //         </TabsList>

// //         <TabsContent
// //           value="lyrics"
// //           className="mt-4"
// //         >
// //           <article className="overflow-x-auto rounded-lg border p-4 whitespace-pre-wrap break-words md:p-6">
// //             {song.lyrics ||
// //               "No lyrics available"}
// //           </article>
// //         </TabsContent>

// //         <TabsContent
// //           value="chords"
// //           className="mt-4"
// //         >
// //           <article className="overflow-x-auto rounded-lg border p-4 font-mono text-sm whitespace-pre-wrap break-words md:p-6">
// //             {song.lyricsWithChords ||
// //               "No chords available"}
// //           </article>
// //         </TabsContent>
// //       </Tabs>
// //     </main>
// //   );
// // }

// import Link from "next/link";

// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";

// import DeleteSongButton from "@/components/DeleteSongButton";

// export const metadata = {
//   title: "Song Details - Worship Flow",
// };

// type Song = {
//   _id: string;
//   title: string;
//   songSequence?: string;
//   key?: string;
//   lyrics?: string;
//   lyricsWithChords?: string;
// };

// async function getSong(
//   id: string
// ): Promise<Song> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/songs/${id}`,
//     {
//       cache: "force-cache",
//       next: {
//         revalidate: 60,
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error(
//       "Failed to fetch song"
//     );
//   }

//   return res.json();
// }

// export default async function SongPage({
//   params,
// }: {
//   params: Promise<{
//     id: string;
//   }>;
// }) {
//   const { id } = await params;

//   const song = await getSong(id);

//   return (
//     <main className="w-full p-4 md:p-6">
//       <div className="mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
//         <div>
//           <h1 className="text-sm md:text-4xl font-bold">
//             {song.title}
//           </h1>

//           {song.key && (
//             <p className="text-xs md:text-lg text-gray-500 mt-2">
//               Key: {song.key}
//             </p>
//           )}
//         </div>

//         <div className="flex gap-3">
//           <Link
//             href={`/songs/${song._id}/edit`}
//             className="border text-sm md:text-md px-2 py-1 rounded-md"
//           >
//             Edit
//           </Link>

//           <DeleteSongButton
//             id={song._id}
//           />
//         </div>
//       </div>

//       <Tabs defaultValue="lyrics">
//         <TabsList className="w-full max-w-md justify-start">
//           <TabsTrigger value="lyrics">
//             Lyrics
//           </TabsTrigger>

//           <TabsTrigger value="chords">
//             Lyrics With Chords
//           </TabsTrigger>

//           <TabsTrigger value="sequence">
//             Song Sequence
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent
//           value="lyrics"
//           className="mt-4"
//         >
//           <article className="overflow-x-auto rounded-lg border p-4 whitespace-pre-wrap break-words md:p-6">
//             {song.lyrics ||
//               "No lyrics available"}
//           </article>
//         </TabsContent>

//         <TabsContent
//           value="chords"
//           className="mt-4"
//         >
//           <article className="overflow-x-auto rounded-lg border p-4 font-mono text-sm whitespace-pre-wrap break-words md:p-6">
//             {song.lyricsWithChords ||
//               "No chords available"}
//           </article>
//         </TabsContent>

//         <TabsContent
//           value="sequence"
//           className="mt-4"
//         >
//           <article className="overflow-x-auto rounded-lg border p-4 whitespace-pre-wrap break-words md:p-6">
//             {song.songSequence ||
//               "No song sequence available"}
//           </article>
//         </TabsContent>
//       </Tabs>
//     </main>
//   );
// }

import Link from "next/link";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import DeleteSongButton from "@/components/DeleteSongButton";

export const metadata = {
  title: "Song Details - Worship Flow",
};

type Song = {
  _id: string;
  title: string;
  songSequence?: string;
  key?: string;
  lyrics?: string;
  lyricsWithChords?: string;
};

async function getSong(
  id: string
): Promise<Song> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/songs/${id}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch song"
    );
  }

  return res.json();
}

function renderSongSequence(sequence?: string) {
  if (!sequence) {
    return "No song sequence available";
  }

  const instrumentColors: Record<string, string> = {
    Keys: "bg-yellow-50 border-yellow-200",
    Drums: "bg-blue-50 border-blue-200",
    "Electric Guitar": "bg-red-50 border-red-200",
    "Acoustic Guitar": "bg-orange-50 border-orange-200",
    Vocals: "bg-purple-50 border-purple-200",
  };

  type Block = {
    instruments: string[];
    lyrics: string[];
    color: string;
  };

  const blocks: Block[] = [];
  let currentBlock: Block | null = null;

  const lines = sequence.split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Skip empty lines, or add them as spacing inside an active block
    if (line === "") {
      if (currentBlock) currentBlock.lyrics.push("");
      continue;
    }

    // Check for new instrument block [...]
    const instrumentMatch = line.match(/^\[(.*?)\]$/);
    
    // Check for section headers {...}
    const sectionMatch = line.match(/^\{(.*?)\}$/);

    if (instrumentMatch) {
      const instruments = instrumentMatch[1]
        .split(",")
        .map((item) => item.trim());

      const color =
        instruments
          .map((instrument) => instrumentColors[instrument])
          .find(Boolean) || "bg-gray-50 border-gray-200";

      // Instantly start a fresh block (implicitly closes the previous one)
      currentBlock = {
        instruments,
        lyrics: [],
        color,
      };
      blocks.push(currentBlock);
      continue;
    }

    // If it's a section title line, push it as a special formatted string inside the block
    if (sectionMatch) {
      if (currentBlock) {
        currentBlock.lyrics.push(`__SECTION__:${sectionMatch[1]}`);
      }
      continue;
    }

    // Otherwise, it's just a normal lyric line
    if (currentBlock) {
      currentBlock.lyrics.push(rawLine);
    }
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <div key={index} className={`rounded-lg border p-4 ${block.color}`}>
          <div className="mb-3 text-xs font-semibold uppercase opacity-70">
            {block.instruments.join(", ")}
          </div>

          <div className="space-y-1 whitespace-pre-wrap">
            {block.lyrics.map((line, lineIndex) => {
              // Check if the line is our internal section marker
              if (line.startsWith("__SECTION__:")) {
                const sectionName = line.replace("__SECTION__:", "");
                return (
                  <div
                    key={lineIndex}
                    className="mt-2 mb-2 font-bold uppercase tracking-wide opacity-70 text-sm border-b pb-1"
                  >
                    {sectionName}
                  </div>
                );
              }

              // Normal lyric line render
              return <div key={lineIndex}>{line || "\u00A0"}</div>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function SongPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const song = await getSong(id);

  return (
    <main className="w-full p-4 md:p-6">
      <div className="mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-sm md:text-4xl font-bold">
            {song.title}
          </h1>

          {song.key && (
            <p className="text-xs md:text-lg text-gray-500 mt-2">
              Key: {song.key}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Link
            href={`/songs/${song._id}/edit`}
            className="border text-sm md:text-md px-2 py-1 rounded-md"
          >
            Edit
          </Link>

          <DeleteSongButton
            id={song._id}
          />
        </div>
      </div>

      <Tabs defaultValue="lyrics">
        <TabsList className="w-full max-w-md justify-start">
          <TabsTrigger value="lyrics">
            Lyrics
          </TabsTrigger>

          <TabsTrigger value="chords">
            Lyrics With Chords
          </TabsTrigger>

          <TabsTrigger value="sequence">
            Song Sequence
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="lyrics"
          className="mt-4"
        >
          <article className="overflow-x-auto rounded-lg border p-4 whitespace-pre-wrap break-words md:p-6">
            {song.lyrics ||
              "No lyrics available"}
          </article>
        </TabsContent>

        <TabsContent
          value="chords"
          className="mt-4"
        >
          <article className="overflow-x-auto rounded-lg border p-4 font-mono text-sm whitespace-pre-wrap break-words md:p-6">
            {song.lyricsWithChords ||
              "No chords available"}
          </article>
        </TabsContent>

        <TabsContent
          value="sequence"
          className="mt-4"
        >
          <article className="overflow-x-auto rounded-lg border p-4 whitespace-pre-wrap break-words md:p-6">
            {renderSongSequence(
              song.songSequence
            )}
          </article>
        </TabsContent>
      </Tabs>
    </main>
  );
}
