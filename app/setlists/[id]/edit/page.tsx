import SetlistForm from "@/components/SetlistForm";

async function getSetlist(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/setlists/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch setlist"
    );
  }

  return res.json();
}

  export const metadata = {
    title : "Edit Setlist - Worship Flow"
}

export default async function EditSetlistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const setlist =
    await getSetlist(id);

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Setlist
      </h1>

      <SetlistForm setlist={setlist} />
    </div>
  );
}