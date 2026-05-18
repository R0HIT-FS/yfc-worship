"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function SetlistForm({
  setlist,
}: {
  setlist?: any;
}) {
  const router = useRouter();

  const [title, setTitle] =
    useState(
      setlist?.title || ""
    );

  const [leaders, setLeaders] =
    useState(
      setlist?.leaders?.join(", ") ||
        ""
    );

  const [songs, setSongs] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [
    selectedSongs,
    setSelectedSongs,
  ] = useState<any[]>(
    setlist?.songs || []
  );

  useEffect(() => {
    async function fetchSongs() {
      const res = await fetch(
        "/api/songs"
      );

      const data =
        await res.json();

      setSongs(data);
    }

    fetchSongs();
  }, []);

  const filteredSongs = useMemo(() => {
    return songs.filter((song) =>
      song.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
  }, [songs, search]);

  function addSong(song: any) {
    const exists =
      selectedSongs.some(
        (s) => s._id === song._id
      );

    if (exists) return;

    setSelectedSongs((prev) => [
      ...prev,
      song,
    ]);

    setSearch("");
  }

  function removeSong(id: string) {
    setSelectedSongs((prev) =>
      prev.filter(
        (song) => song._id !== id
      )
    );
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const payload = {
      title,

      leaders: leaders
        .split(",")
        .map((leader:any) =>
          leader.trim()
        )
        .filter(Boolean),

      songs: selectedSongs.map(
        (song) => song._id
      ),
    };

    const url = setlist
      ? `/api/setlists/${setlist._id}`
      : "/api/setlists";

    const method = setlist
      ? "PATCH"
      : "POST";

    const res = await fetch(url, {
      method,

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Something went wrong");

      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="block mb-2 font-medium">
          Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border rounded-md p-3 bg-background"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Leaders
        </label>

        <input
          value={leaders}
          onChange={(e) =>
            setLeaders(
              e.target.value
            )
          }
          placeholder="Rohan, Praneeth..."
          className="w-full border rounded-md p-3 bg-background"
        />
      </div>

      <div className="space-y-3">
        <label className="block font-medium">
          Songs
        </label>

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search songs..."
          className="w-full border rounded-md p-3 bg-background"
        />

        {search && (
          <div className="border rounded-lg max-h-[250px] overflow-y-auto">
            {filteredSongs.length >
            0 ? (
              filteredSongs.map(
                (song) => (
                  <button
                    key={song._id}
                    type="button"
                    onClick={() =>
                      addSong(song)
                    }
                    className="w-full text-left px-4 py-3 hover:bg-accent transition border-b last:border-b-0"
                  >
                    {song.title}
                  </button>
                )
              )
            ) : (
              <p className="p-4 text-sm text-muted-foreground">
                No songs found
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          {selectedSongs.map(
            (song, index) => (
              <div
                key={song._id}
                className="flex items-center justify-between border rounded-lg px-4 py-3"
              >
                <div>
                  <p className="font-medium">
                    {index + 1}.{" "}
                    {song.title}
                  </p>

                  {song.key && (
                    <p className="text-sm text-muted-foreground">
                      Key: {song.key}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeSong(
                      song._id
                    )
                  }
                  className="text-muted-foreground hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )
          )}
        </div>
      </div>

      <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md">
        {setlist
          ? "Update Setlist"
          : "Create Setlist"}
      </button>
    </form>
  );
}