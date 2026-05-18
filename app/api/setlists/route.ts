import { connectDB } from "@/lib/mongodb";
import Setlist from "@/models/Setlist";
import "@/models/Song";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const setlists = await Setlist.find()
      .populate("songs")
      .sort({
        createdAt: -1,
      });

    return NextResponse.json(setlists);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to fetch setlists",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const setlist =
      await Setlist.create({
        title: body.title,
        leaders: body.leaders,
        songs: body.songs,
      });

    const populatedSetlist =
      await Setlist.findById(
        setlist._id
      ).populate("songs");

    return NextResponse.json(
      populatedSetlist,
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to create setlist",
      },
      {
        status: 500,
      }
    );
  }
}