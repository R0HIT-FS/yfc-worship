// components/SortableSongsList.tsx

"use client";

import Link from "next/link";

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { memo, useCallback, useState, useTransition } from "react";

import type { Song } from "@/app/setlists/[id]/page";

function SortableSongCard({ song, index }: { song: Song; index: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: song._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "opacity-50" : ""}
    >
      <div className="flex items-stretch gap-2">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab rounded-lg border px-3 text-gray-500 active:cursor-grabbing"
        >
          ☰
        </button>

        <Link
          href={`/songs/${song._id}`}
          prefetch={false}
          className="block flex-1 rounded-xl border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-900"
        >
          <article>
            <p className="text-sm text-gray-500">Song {index + 1}</p>

            <h2 className="line-clamp-1 text-lg font-semibold md:text-xl">
              {song.title}
            </h2>

            {song.key && (
              <p className="mt-1 text-sm text-gray-500">Key: {song.key}</p>
            )}
          </article>
        </Link>
      </div>
    </div>
  );
}

const MemoSortableSongCard = memo(SortableSongCard);

export default function SortableSongsList({
  songs,
  setlistId,
}: {
  songs: Song[];
  setlistId: string;
}) {
  const [items, setItems] = useState(songs);

  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragEnd = useCallback(
    async (event: any) => {
      const { active, over } = event;

      if (!over || active.id === over.id) {
        return;
      }

      const oldIndex = items.findIndex((song) => song._id === active.id);

      const newIndex = items.findIndex((song) => song._id === over.id);

      const reordered = arrayMove(items, oldIndex, newIndex);

      setItems(reordered);

      startTransition(async () => {
        try {
          await fetch(`/api/setlists/${setlistId}/reorder`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              songIds: reordered.map((song) => song._id),
            }),
          });
        } catch {
          console.error("Failed to reorder");
        }
      });
    },
    [items, setlistId],
  );

  return (
    <section className="space-y-3">
      {isPending && <p className="text-sm text-gray-500">Saving order...</p>}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((song) => song._id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((song, index) => (
            <MemoSortableSongCard key={song._id} song={song} index={index} />
          ))}
        </SortableContext>
      </DndContext>
    </section>
  );
}
