import { NextResponse } from "next/server";

import mongoose from "mongoose";

import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/mongodb";
import Setlist from "@/models/Setlist";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    const { id } =
      await params;

    const body =
      await request.json();

    const {
      songIds,
    }: {
      songIds: string[];
    } = body;

    // convert string ids to Mongo ObjectIds
    const objectIds =
      songIds.map(
        (songId) =>
          new mongoose.Types.ObjectId(
            songId,
          ),
      );

    // save reordered ids
    await Setlist.findByIdAndUpdate(
      id,
      {
        songs: objectIds,
      },
    );

    // clear cached setlist page
    revalidatePath(
      `/setlists/${id}`,
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to reorder songs",
      },
      {
        status: 500,
      },
    );
  }
}