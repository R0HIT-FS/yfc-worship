// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// export default function SongsList({
//   songs,
// }: {
//   songs: any[];
// }) {
//   const [search, setSearch] =
//     useState("");

//   const filteredSongs =
//     useMemo(() => {
//       return songs.filter(
//         (song) =>
//           song.title
//             .toLowerCase()
//             .includes(
//               search.toLowerCase()
//             ) ||
//           song.key
//             ?.toLowerCase()
//             .includes(
//               search.toLowerCase()
//             )
//       );
//     }, [songs, search]);

//   return (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Search songs..."
//         value={search}
//         onChange={(e) =>
//           setSearch(e.target.value)
//         }
//         className="w-full border rounded-lg p-3 bg-background"
//       />

//       {filteredSongs.length > 0 ? (
//         <div className="space-y-4">
//           {filteredSongs.map(
//             (song: any) => (
//               <Link
//                 key={song._id}
//                 href={`/songs/${song._id}`}
//                 className="block border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-zinc-900 transition"
//               >
//                 <h2 className="font-semibold text-lg">
//                   {song.title}
//                 </h2>

//                 {song.key && (
//                   <p className="text-sm text-gray-500">
//                     Key: {song.key}
//                   </p>
//                 )}
//               </Link>
//             )
//           )}
//         </div>
//       ) : (
//         <p className="text-center text-muted-foreground py-10">
//           No songs found
//         </p>
//       )}
//     </div>
//   );
// }




// components/SongsList.tsx

"use client";

import Link from "next/link";
import {
  memo,
  useDeferredValue,
  useMemo,
  useState,
} from "react";

type Song = {
  _id: string;
  title: string;
  key?: string;
};

type SortOption =
  | "title-asc"
  | "title-desc"
  | "key-asc"
  | "key-desc";

function SongsList({
  songs,
}: {
  songs: Song[];
}) {
  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState<SortOption>(
      "title-asc"
    );

  // smoother typing for large lists
  const deferredSearch =
    useDeferredValue(search);

  const normalizedSearch =
    deferredSearch
      .trim()
      .toLowerCase();

  const filteredSongs =
    useMemo(() => {
      let result = songs;

      // SEARCH
      if (normalizedSearch) {
        result = songs.filter(
          (song) => {
            const title =
              song.title?.toLowerCase() ||
              "";

            const key =
              song.key?.toLowerCase() ||
              "";

            return (
              title.includes(
                normalizedSearch
              ) ||
              key.includes(
                normalizedSearch
              )
            );
          }
        );
      }

      // SORT
      return [...result].sort(
        (a, b) => {
          switch (sortBy) {
            case "title-desc":
              return b.title.localeCompare(
                a.title
              );

            case "key-asc":
              return (
                a.key || ""
              ).localeCompare(
                b.key || ""
              );

            case "key-desc":
              return (
                b.key || ""
              ).localeCompare(
                a.key || ""
              );

            case "title-asc":
            default:
              return a.title.localeCompare(
                b.title
              );
          }
        }
      );
    }, [
      songs,
      normalizedSearch,
      sortBy,
    ]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search songs..."
          autoComplete="off"
          spellCheck={false}
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full rounded-lg border bg-background p-3 outline-none"
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target
                .value as SortOption
            )
          }
          className="rounded-lg border bg-background px-4 py-3 outline-none"
        >
          <option value="title-asc">
            Title A-Z
          </option>

          <option value="title-desc">
            Title Z-A
          </option>

          <option value="key-asc">
            Key A-Z
          </option>

          <option value="key-desc">
            Key Z-A
          </option>
        </select>
      </div>

      {filteredSongs.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">
          No songs found
        </p>
      ) : (
        <div className="space-y-3">
          {filteredSongs.map(
            (song) => (
              <Link
                key={song._id}
                href={`/songs/${song._id}`}
                className="block rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-900"
              >
                <article>
                  <h2 className="line-clamp-1 text-lg font-semibold">
                    {
                      song.title
                    }
                  </h2>

                  {song.key && (
                    <p className="text-sm text-gray-500">
                      Key:{" "}
                      {song.key}
                    </p>
                  )}
                </article>
              </Link>
            )
          )}
        </div>
      )}
    </section>
  );
}

export default memo(SongsList);