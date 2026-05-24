// "use client";

// import { memo, useCallback, useState, useTransition } from "react";

// import { useRouter } from "next/navigation";

// type Song = {
//   _id?: string;
//   title?: string;
//   songSequence?: string;
//   key?: string;
//   lyrics?: string;
//   lyricsWithChords?: string;
// };

// function SongForm({ song }: { song?: Song }) {
//   const router = useRouter();

//   const [isPending, startTransition] = useTransition();

//   const [form, setForm] = useState({
//     title: song?.title || "",
//     songSequence: song?.songSequence || "",
//     key: song?.key || "",
//     lyrics: song?.lyrics || "",
//     lyricsWithChords: song?.lyricsWithChords || "",
//   });

//   const handleChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       const { name, value } = e.target;

//       setForm((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     },
//     [],
//   );

//   const handleSubmit = useCallback(
//     async (e: React.FormEvent) => {
//       e.preventDefault();

//       try {
//         const res = await fetch(
//           song ? `/api/songs/${song._id}` : "/api/songs",
//           {
//             method: song ? "PATCH" : "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(form),
//           },
//         );

//         if (!res.ok) {
//           throw new Error("Request failed");
//         }

//         startTransition(() => {
//           router.push("/songs");

//           router.refresh();
//         });
//       } catch {
//         alert("Something went wrong");
//       }
//     },
//     [form, router, song],
//   );

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <label htmlFor="title" className="mb-2 block font-medium">
//           Title
//         </label>

//         <input
//           id="title"
//           name="title"
//           required
//           autoComplete="off"
//           value={form.title}
//           onChange={handleChange}
//           className="w-full rounded-md border p-3 outline-none"
//         />
//       </div>

//       <div>
//         <label htmlFor="key" className="mb-2 block font-medium">
//           Key
//         </label>

//         <input
//           id="key"
//           name="key"
//           autoComplete="off"
//           value={form.key}
//           onChange={handleChange}
//           className="w-full rounded-md border p-3 outline-none"
//         />
//       </div>

//       <div>
//         <label htmlFor="lyrics" className="mb-2 block font-medium">
//           Lyrics
//         </label>

//         <textarea
//           id="lyrics"
//           name="lyrics"
//           value={form.lyrics}
//           onChange={handleChange}
//           className="min-h-[250px] w-full rounded-md border p-3 outline-none"
//         />
//       </div>

//       <div>
//         <label htmlFor="lyricsWithChords" className="mb-2 block font-medium">
//           Lyrics With Chords
//         </label>

//         <textarea
//           id="lyricsWithChords"
//           name="lyricsWithChords"
//           value={form.lyricsWithChords}
//           onChange={handleChange}
//           className="min-h-[250px] w-full rounded-md border p-3 font-mono outline-none"
//         />
//       </div>
//       <div>
//         <label htmlFor="songSequence" className="mb-2 block font-medium">
//           Song Sequence
//         </label>

//         <textarea
//           id="songSequence"
//           name="songSequence"
//           value={form.songSequence}
//           onChange={handleChange}
//           className="min-h-[120px] w-full rounded-md border p-3 font-mono outline-none"
//           placeholder="[Keys]\nIntro\nVerse 1\nChorus\nBridge"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={isPending}
//         className="rounded-md bg-black px-6 py-3 text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
//       >
//         {isPending ? "Saving..." : song ? "Update Song" : "Create Song"}
//       </button>
//     </form>
//   );
// }

// export default memo(SongForm);



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
  songSequence?: string;
  key?: string;
  lyrics?: string;
  lyricsWithChords?: string;
};

type InputFieldProps = {
  id: string;
  name: string;
  value: string;
  required?: boolean;
  autoComplete?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

type TextAreaFieldProps = {
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

const InputField = memo(
  ({
    id,
    name,
    value,
    required,
    autoComplete,
    onChange,
  }: InputFieldProps) => {
    return (
      <input
        id={id}
        name={name}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border p-3 outline-none"
      />
    );
  },
);

InputField.displayName = "InputField";

const TextAreaField = memo(
  ({
    id,
    name,
    value,
    placeholder,
    className,
    onChange,
  }: TextAreaFieldProps) => {
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
      />
    );
  },
);

TextAreaField.displayName =
  "TextAreaField";

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
      songSequence:
        song?.songSequence || "",
      key: song?.key || "",
      lyrics: song?.lyrics || "",
      lyricsWithChords:
        song?.lyricsWithChords || "",
    });

  const handleInputChange =
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
      [],
    );

  const handleTextareaChange =
    useCallback(
      (
        e: React.ChangeEvent<HTMLTextAreaElement>
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
      [],
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
                  form,
                ),
              },
            );

          if (!res.ok) {
            throw new Error(
              "Request failed",
            );
          }

          startTransition(() => {
            router.push(
              "/songs",
            );
          });
        } catch {
          alert(
            "Something went wrong",
          );
        }
      },
      [form, router, song],
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

        <InputField
          id="title"
          name="title"
          required
          autoComplete="off"
          value={form.title}
          onChange={
            handleInputChange
          }
        />
      </div>

      <div>
        <label
          htmlFor="key"
          className="mb-2 block font-medium"
        >
          Key
        </label>

        <InputField
          id="key"
          name="key"
          autoComplete="off"
          value={form.key}
          onChange={
            handleInputChange
          }
        />
      </div>

      <div>
        <label
          htmlFor="lyrics"
          className="mb-2 block font-medium"
        >
          Lyrics
        </label>

        <TextAreaField
          id="lyrics"
          name="lyrics"
          value={form.lyrics}
          onChange={
            handleTextareaChange
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

        <TextAreaField
          id="lyricsWithChords"
          name="lyricsWithChords"
          value={
            form.lyricsWithChords
          }
          onChange={
            handleTextareaChange
          }
          className="min-h-[250px] w-full rounded-md border p-3 font-mono outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="songSequence"
          className="mb-2 block font-medium"
        >
          Song Sequence
        </label>

        <TextAreaField
          id="songSequence"
          name="songSequence"
          value={
            form.songSequence
          }
          onChange={
            handleTextareaChange
          }
          placeholder="[Keys]

Intro
Verse 1
Chorus
Verse 2
Bridge
Chorus x2"
          className="min-h-[120px] w-full rounded-md border p-3 font-mono outline-none"
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