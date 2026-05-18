import Link from "next/link";
import { title } from "process";

async function getSetlists() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/setlists`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch setlists"
    );
  }

  return res.json();
}

export const metadata = {
  title: "Worship Flow - Home"
}

export default async function page() {
  const setlists =
    await getSetlists();

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Setlists
        </h1>

        <Link
          href="/setlists/new"
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          New Setlist
        </Link>
      </div>

      <div className="space-y-6">
        {setlists.length>0 ? setlists.map(
          (setlist: any) => (
            <Link
              key={setlist._id}
              href={`/setlists/${setlist._id}`}
              className="block border rounded-xl p-5 hover:bg-gray-50 transition"
            >
              <h2 className="text-2xl font-semibold">
                {setlist.title}
              </h2>

              {setlist.leaders
                ?.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Leaders:{" "}
                  {setlist.leaders.join(
                    ", "
                  )}
                </p>
              )}

              <p className="text-sm text-gray-500 mt-1">
                {
                  setlist.songs
                    ?.length
                }{" "}
                songs
              </p>
            </Link>
          )
        ) : <p className='text-center text-md md:text-xl'>No Setlists created yet!</p>}
      </div>
    </div>
  );
}