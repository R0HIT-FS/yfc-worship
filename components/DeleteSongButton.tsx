"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteSongButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this song?"
    );

    if (!confirmed) return;

    setLoading(true);

    const res = await fetch(
      `/api/songs/${id}`,
      {
        method: "DELETE",
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert("Failed to delete song");
      return;
    }

    router.push("/songs");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500 text-white text-sm md:text-md px-2 py-1 rounded-md"
    >
      {loading
        ? "Deleting..."
        : "Delete"}
    </button>
  );
}