// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SongForm({
//   song,
// }: {
//   song?: any;
// }) {
//   const router = useRouter();

//   const [title, setTitle] = useState(
//     song?.title || ""
//   );

//   const [key, setKey] = useState(
//     song?.key || ""
//   );

//   const [lyrics, setLyrics] = useState(
//     song?.lyrics || ""
//   );

//   const [
//     lyricsWithChords,
//     setLyricsWithChords,
//   ] = useState(
//     song?.lyricsWithChords || ""
//   );

//   const [loading, setLoading] =
//     useState(false);

//   async function handleSubmit(
//     e: React.FormEvent
//   ) {
//     e.preventDefault();

//     setLoading(true);

//     const payload = {
//       title,
//       key,
//       lyrics,
//       lyricsWithChords,
//     };

//     const url = song
//       ? `/api/songs/${song._id}`
//       : "/api/songs";

//     const method = song
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

//     setLoading(false);

//     if (!res.ok) {
//       alert("Something went wrong");
//       return;
//     }

//     router.push("/songs");
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
//           className="w-full border rounded-md p-3"
//           required
//         />
//       </div>

//       <div>
//         <label className="block mb-2 font-medium">
//           Key
//         </label>

//         <input
//           value={key}
//           onChange={(e) =>
//             setKey(e.target.value)
//           }
//           className="w-full border rounded-md p-3"
//         />
//       </div>

//       <div>
//         <label className="block mb-2 font-medium">
//           Lyrics
//         </label>

//         <textarea
//           value={lyrics}
//           onChange={(e) =>
//             setLyrics(e.target.value)
//           }
//           className="w-full border rounded-md p-3 min-h-[250px]"
//         />
//       </div>

//       <div>
//         <label className="block mb-2 font-medium">
//           Lyrics With Chords
//         </label>

//         <textarea
//           value={lyricsWithChords}
//           onChange={(e) =>
//             setLyricsWithChords(
//               e.target.value
//             )
//           }
//           className="w-full border rounded-md p-3 min-h-[250px] font-mono"
//         />
//       </div>

//       <button
//         disabled={loading}
//         className="bg-black text-white px-6 py-3 rounded-md"
//       >
//         {loading
//           ? "Saving..."
//           : song
//           ? "Update Song"
//           : "Create Song"}
//       </button>
//     </form>
//   );
// }


// components/SongForm.tsx

"use client";

import {
  memo,
  useCallback,
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

type Song = {
  _id?: string;
  title?: string;
  key?: string;
  lyrics?: string;
  lyricsWithChords?: string;
};

function SongForm({
  song,
}: {
  song?: Song;
}) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [form, setForm] =
    useState({
      title: song?.title || "",
      key: song?.key || "",
      lyrics: song?.lyrics || "",
      lyricsWithChords:
        song?.lyricsWithChords ||
        "",
    });

  const handleChange =
    useCallback(
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement
        >
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

  const handleSubmit =
    useCallback(
      async (
        e: React.FormEvent
      ) => {
        e.preventDefault();

        try {
          const res =
            await fetch(
              song
                ? `/api/songs/${song._id}`
                : "/api/songs",
              {
                method: song
                  ? "PATCH"
                  : "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify(
                  form
                ),
              }
            );

          if (!res.ok) {
            throw new Error(
              "Request failed"
            );
          }

          startTransition(() => {
            router.push(
              "/songs"
            );

            router.refresh();
          });
        } catch {
          alert(
            "Something went wrong"
          );
        }
      },
      [form, router, song]
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
          className="w-full rounded-md border p-3 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="key"
          className="mb-2 block font-medium"
        >
          Key
        </label>

        <input
          id="key"
          name="key"
          autoComplete="off"
          value={form.key}
          onChange={
            handleChange
          }
          className="w-full rounded-md border p-3 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="lyrics"
          className="mb-2 block font-medium"
        >
          Lyrics
        </label>

        <textarea
          id="lyrics"
          name="lyrics"
          value={form.lyrics}
          onChange={
            handleChange
          }
          className="min-h-[250px] w-full rounded-md border p-3 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="lyricsWithChords"
          className="mb-2 block font-medium"
        >
          Lyrics With Chords
        </label>

        <textarea
          id="lyricsWithChords"
          name="lyricsWithChords"
          value={
            form.lyricsWithChords
          }
          onChange={
            handleChange
          }
          className="min-h-[250px] w-full rounded-md border p-3 font-mono outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-black px-6 py-3 text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
      >
        {isPending
          ? "Saving..."
          : song
          ? "Update Song"
          : "Create Song"}
      </button>
    </form>
  );
}

export default memo(SongForm);