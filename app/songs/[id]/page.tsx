import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";

import DeleteSongButton from "@/components/DeleteSongButton";

export const metadata = {
    title : "Song Details - Worship Flow"
}

async function getSong(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/songs/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch song");
  }

  return res.json();
}

export default async function SongPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const song = await getSong(id);

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-sm md:text-4xl font-bold">{song.title}</h1>

          {song.key && <p className="text-xs md:text-lg text-gray-500 mt-2">Key: {song.key}</p>}
        </div>

        <div className="flex gap-3">
          <Link
            href={`/songs/${song._id}/edit`}
            className="border text-sm md:text-md px-2 py-1 rounded-md"
          >
            Edit
          </Link>

          <DeleteSongButton id={song._id} />
        </div>
      </div>

      <Tabs defaultValue="lyrics">
        <TabsList>
          <TabsTrigger value="lyrics">Lyrics</TabsTrigger>

          <TabsTrigger value="chords">Lyrics With Chords</TabsTrigger>
        </TabsList>

        <TabsContent value="lyrics">
          <div className="border rounded-lg p-6 mt-4 whitespace-pre-wrap">
            {song.lyrics}
          </div>
        </TabsContent>

        <TabsContent value="chords">
          <div className="border rounded-lg p-6 mt-4 whitespace-pre-wrap font-mono">
            {song.lyricsWithChords}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


