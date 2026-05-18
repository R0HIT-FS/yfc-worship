import { connectDB } from "@/lib/mongodb";
import Setlist from "@/models/Setlist";
import { NextResponse } from "next/server";
import "@/models/Song";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const { id } = await params;

    const setlist =
      await Setlist.findById(
        id
      ).populate("songs");

    if (!setlist) {
      return NextResponse.json(
        {
          error: "Setlist not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(setlist);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to fetch setlist",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const body = await req.json();

    const { id } = await params;

    const updatedSetlist =
      await Setlist.findByIdAndUpdate(
        id,
        {
          title: body.title,
          leaders: body.leaders,
          songs: body.songs,
        },
        {
          new: true,
        }
      ).populate("songs");

    return NextResponse.json(
      updatedSetlist
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to update setlist",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const { id } = await params;

    await Setlist.findByIdAndDelete(
      id
    );

    return NextResponse.json({
      message: "Setlist deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to delete setlist",
      },
      {
        status: 500,
      }
    );
  }
}