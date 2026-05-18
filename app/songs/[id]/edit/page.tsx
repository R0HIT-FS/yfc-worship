import SongForm from "@/components/SongForm";

async function getSong(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/songs/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch song");
  }

  return res.json();
}

  export const metadata = {
    title : "Edit Song - Worship Flow"
}

export default async function EditSongPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const song = await getSong(id);



  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Song
      </h1>

      <SongForm song={song} />
    </div>
  );
}