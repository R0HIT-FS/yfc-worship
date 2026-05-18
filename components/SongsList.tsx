"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function SongsList({
  songs,
}: {
  songs: any[];
}) {
  const [search, setSearch] =
    useState("");

  const filteredSongs =
    useMemo(() => {
      return songs.filter(
        (song) =>
          song.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          song.key
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [songs, search]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search songs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-lg p-3 bg-background"
      />

      {filteredSongs.length > 0 ? (
        <div className="space-y-4">
          {filteredSongs.map(
            (song: any) => (
              <Link
                key={song._id}
                href={`/songs/${song._id}`}
                className="block border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-zinc-900 transition"
              >
                <h2 className="font-semibold text-lg">
                  {song.title}
                </h2>

                {song.key && (
                  <p className="text-sm text-gray-500">
                    Key: {song.key}
                  </p>
                )}
              </Link>
            )
          )}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">
          No songs found
        </p>
      )}
    </div>
  );
}