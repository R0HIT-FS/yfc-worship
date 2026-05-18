"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteSetlistButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this setlist?"
    );

    if (!confirmed) return;

    setLoading(true);

    const res = await fetch(
      `/api/setlists/${id}`,
      {
        method: "DELETE",
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert(
        "Failed to delete setlist"
      );

      return;
    }

    router.push("/");
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