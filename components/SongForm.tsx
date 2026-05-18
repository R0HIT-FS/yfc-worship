"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SongForm({
  song,
}: {
  song?: any;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(
    song?.title || ""
  );

  const [key, setKey] = useState(
    song?.key || ""
  );

  const [lyrics, setLyrics] = useState(
    song?.lyrics || ""
  );

  const [
    lyricsWithChords,
    setLyricsWithChords,
  ] = useState(
    song?.lyricsWithChords || ""
  );

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const payload = {
      title,
      key,
      lyrics,
      lyricsWithChords,
    };

    const url = song
      ? `/api/songs/${song._id}`
      : "/api/songs";

    const method = song
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

    setLoading(false);

    if (!res.ok) {
      alert("Something went wrong");
      return;
    }

    router.push("/songs");
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
          className="w-full border rounded-md p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Key
        </label>

        <input
          value={key}
          onChange={(e) =>
            setKey(e.target.value)
          }
          className="w-full border rounded-md p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Lyrics
        </label>

        <textarea
          value={lyrics}
          onChange={(e) =>
            setLyrics(e.target.value)
          }
          className="w-full border rounded-md p-3 min-h-[250px]"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Lyrics With Chords
        </label>

        <textarea
          value={lyricsWithChords}
          onChange={(e) =>
            setLyricsWithChords(
              e.target.value
            )
          }
          className="w-full border rounded-md p-3 min-h-[250px] font-mono"
        />
      </div>

      <button
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded-md"
      >
        {loading
          ? "Saving..."
          : song
          ? "Update Song"
          : "Create Song"}
      </button>
    </form>
  );
}