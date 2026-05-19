// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { X } from "lucide-react";

// export default function SetlistForm({
//   setlist,
// }: {
//   setlist?: any;
// }) {
//   const router = useRouter();

//   const [title, setTitle] =
//     useState(
//       setlist?.title || ""
//     );

//   const [leaders, setLeaders] =
//     useState(
//       setlist?.leaders?.join(", ") ||
//         ""
//     );

//   const [songs, setSongs] =
//     useState<any[]>([]);

//   const [search, setSearch] =
//     useState("");

//   const [
//     selectedSongs,
//     setSelectedSongs,
//   ] = useState<any[]>(
//     setlist?.songs || []
//   );

//   useEffect(() => {
//     async function fetchSongs() {
//       const res = await fetch(
//         "/api/songs"
//       );

//       const data =
//         await res.json();

//       setSongs(data);
//     }

//     fetchSongs();
//   }, []);

//   const filteredSongs = useMemo(() => {
//     return songs.filter((song) =>
//       song.title
//         .toLowerCase()
//         .includes(
//           search.toLowerCase()
//         )
//     );
//   }, [songs, search]);

//   function addSong(song: any) {
//     const exists =
//       selectedSongs.some(
//         (s) => s._id === song._id
//       );

//     if (exists) return;

//     setSelectedSongs((prev) => [
//       ...prev,
//       song,
//     ]);

//     setSearch("");
//   }

//   function removeSong(id: string) {
//     setSelectedSongs((prev) =>
//       prev.filter(
//         (song) => song._id !== id
//       )
//     );
//   }

//   async function handleSubmit(
//     e: React.FormEvent
//   ) {
//     e.preventDefault();

//     const payload = {
//       title,

//       leaders: leaders
//         .split(",")
//         .map((leader:any) =>
//           leader.trim()
//         )
//         .filter(Boolean),

//       songs: selectedSongs.map(
//         (song) => song._id
//       ),
//     };

//     const url = setlist
//       ? `/api/setlists/${setlist._id}`
//       : "/api/setlists";

//     const method = setlist
//       ? "PATCH"
//       : "POST";

//     const res = await fetch(url, {
//       method,

//       headers: {
//         "Content-Type":
//           "application/json",
//       },

//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       alert("Something went wrong");

//       return;
//     }

//     router.push("/");
//     router.refresh();
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-6"
//     >
//       <div>
//         <label className="block mb-2 font-medium">
//           Title
//         </label>

//         <input
//           value={title}
//           onChange={(e) =>
//             setTitle(e.target.value)
//           }
//           className="w-full border rounded-md p-3 bg-background"
//           required
//         />
//       </div>

//       <div>
//         <label className="block mb-2 font-medium">
//           Leaders
//         </label>

//         <input
//           value={leaders}
//           onChange={(e) =>
//             setLeaders(
//               e.target.value
//             )
//           }
//           placeholder="Rohan, Praneeth..."
//           className="w-full border rounded-md p-3 bg-background"
//         />
//       </div>

//       <div className="space-y-3">
//         <label className="block font-medium">
//           Songs
//         </label>

//         <input
//           value={search}
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//           placeholder="Search songs..."
//           className="w-full border rounded-md p-3 bg-background"
//         />

//         {search && (
//           <div className="border rounded-lg max-h-[250px] overflow-y-auto">
//             {filteredSongs.length >
//             0 ? (
//               filteredSongs.map(
//                 (song) => (
//                   <button
//                     key={song._id}
//                     type="button"
//                     onClick={() =>
//                       addSong(song)
//                     }
//                     className="w-full text-left px-4 py-3 hover:bg-accent transition border-b last:border-b-0"
//                   >
//                     {song.title}
//                   </button>
//                 )
//               )
//             ) : (
//               <p className="p-4 text-sm text-muted-foreground">
//                 No songs found
//               </p>
//             )}
//           </div>
//         )}

//         <div className="space-y-2">
//           {selectedSongs.map(
//             (song, index) => (
//               <div
//                 key={song._id}
//                 className="flex items-center justify-between border rounded-lg px-4 py-3"
//               >
//                 <div>
//                   <p className="font-medium">
//                     {index + 1}.{" "}
//                     {song.title}
//                   </p>

//                   {song.key && (
//                     <p className="text-sm text-muted-foreground">
//                       Key: {song.key}
//                     </p>
//                   )}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     removeSong(
//                       song._id
//                     )
//                   }
//                   className="text-muted-foreground hover:text-red-500"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               </div>
//             )
//           )}
//         </div>
//       </div>

//       <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md">
//         {setlist
//           ? "Update Setlist"
//           : "Create Setlist"}
//       </button>
//     </form>
//   );
// }




"use client";

import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";

type Song = {
  _id: string;
  title: string;
  key?: string;
};

type Setlist = {
  _id?: string;
  title?: string;
  leaders?: string[];
  songs?: Song[];
};

function SetlistForm({
  setlist,
}: {
  setlist?: Setlist;
}) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [songs, setSongs] =
    useState<Song[]>([]);

  const [search, setSearch] =
    useState("");

  const deferredSearch =
    useDeferredValue(search);

  const [form, setForm] =
    useState({
      title:
        setlist?.title || "",

      leaders:
        setlist?.leaders?.join(
          ", "
        ) || "",
    });

  const [
    selectedSongs,
    setSelectedSongs,
  ] = useState<Song[]>(
    setlist?.songs || []
  );

  // fetch songs once
  useEffect(() => {
    let mounted = true;

    async function fetchSongs() {
      try {
        const res =
          await fetch(
            "/api/songs",
            {
              cache:
                "force-cache",
            }
          );

        if (!res.ok) return;

        const data =
          await res.json();

        if (mounted) {
          setSongs(data);
        }
      } catch {}
    }

    fetchSongs();

    return () => {
      mounted = false;
    };
  }, []);

  const normalizedSearch =
    deferredSearch
      .trim()
      .toLowerCase();

  const selectedIds =
    useMemo(
      () =>
        new Set(
          selectedSongs.map(
            (song) =>
              song._id
          )
        ),
      [selectedSongs]
    );

  const filteredSongs =
    useMemo(() => {
      if (!normalizedSearch)
        return [];

      return songs.filter(
        (song) =>
          !selectedIds.has(
            song._id
          ) &&
          song.title
            .toLowerCase()
            .includes(
              normalizedSearch
            )
      );
    }, [
      songs,
      normalizedSearch,
      selectedIds,
    ]);

  const handleChange =
    useCallback(
      (
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        const {
          name,
          value,
        } = e.target;

        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      },
      []
    );

  const addSong =
    useCallback(
      (song: Song) => {
        setSelectedSongs(
          (prev) => [
            ...prev,
            song,
          ]
        );

        setSearch("");
      },
      []
    );

  const removeSong =
    useCallback(
      (id: string) => {
        setSelectedSongs(
          (prev) =>
            prev.filter(
              (song) =>
                song._id !==
                id
            )
        );
      },
      []
    );

  const handleSubmit =
    useCallback(
      async (
        e: React.FormEvent
      ) => {
        e.preventDefault();

        try {
          const payload = {
            title:
              form.title,

            leaders:
              form.leaders
                .split(",")
                .map(
                  (
                    leader
                  ) =>
                    leader.trim()
                )
                .filter(
                  Boolean
                ),

            songs:
              selectedSongs.map(
                (
                  song
                ) =>
                  song._id
              ),
          };

          const res =
            await fetch(
              setlist
                ? `/api/setlists/${setlist._id}`
                : "/api/setlists",
              {
                method:
                  setlist
                    ? "PATCH"
                    : "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify(
                  payload
                ),
              }
            );

          if (!res.ok) {
            throw new Error();
          }

          startTransition(
            () => {
              router.push(
                "/"
              );

              router.refresh();
            }
          );
        } catch {
          alert(
            "Something went wrong"
          );
        }
      },
      [
        form,
        selectedSongs,
        router,
        setlist,
      ]
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-2 block font-medium"
        >
          Title
        </label>

        <input
          id="title"
          name="title"
          required
          autoComplete="off"
          value={form.title}
          onChange={
            handleChange
          }
          className="w-full rounded-md border bg-background p-3 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="leaders"
          className="mb-2 block font-medium"
        >
          Leaders
        </label>

        <input
          id="leaders"
          name="leaders"
          autoComplete="off"
          placeholder="Rohan, Praneeth..."
          value={form.leaders}
          onChange={
            handleChange
          }
          className="w-full rounded-md border bg-background p-3 outline-none"
        />
      </div>

      <section className="space-y-3">
        <label className="block font-medium">
          Songs
        </label>

        <input
          value={search}
          autoComplete="off"
          spellCheck={false}
          placeholder="Search songs..."
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full rounded-md border bg-background p-3 outline-none"
        />

        {!!search && (
          <div className="max-h-[250px] overflow-y-auto rounded-lg border">
            {filteredSongs.length >
            0 ? (
              filteredSongs.map(
                (song) => (
                  <button
                    key={
                      song._id
                    }
                    type="button"
                    onClick={() =>
                      addSong(
                        song
                      )
                    }
                    className="w-full border-b px-4 py-3 text-left transition-colors hover:bg-accent last:border-b-0"
                  >
                    <p className="font-medium">
                      {
                        song.title
                      }
                    </p>

                    {song.key && (
                      <p className="text-sm text-muted-foreground">
                        Key:{" "}
                        {
                          song.key
                        }
                      </p>
                    )}
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
            (
              song,
              index
            ) => (
              <article
                key={song._id}
                className="flex items-center justify-between rounded-lg border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="line-clamp-1 font-medium">
                    {index + 1}
                    .{" "}
                    {
                      song.title
                    }
                  </p>

                  {song.key && (
                    <p className="text-sm text-muted-foreground">
                      Key:{" "}
                      {
                        song.key
                      }
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  aria-label={`Remove ${song.title}`}
                  onClick={() =>
                    removeSong(
                      song._id
                    )
                  }
                  className="ml-3 shrink-0 text-muted-foreground transition-colors hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </article>
            )
          )}
        </div>
      </section>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-primary px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
      >
        {isPending
          ? "Saving..."
          : setlist
          ? "Update Setlist"
          : "Create Setlist"}
      </button>
    </form>
  );
}
export default memo(SetlistForm);