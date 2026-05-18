import SongForm from "@/components/SongForm";

export const metadata = {
    title : "Add New Song - Worship Flow"
}

export default function NewSongPage() {
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">
        Add Song
      </h1>

      <SongForm />
    </div>
  );
}