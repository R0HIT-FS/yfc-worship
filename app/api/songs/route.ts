// import { connectDB } from "@/lib/mongodb";
// import Song from "@/models/Song";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     await connectDB();

//     const songs = await Song.find().sort({
//       createdAt: -1,
//     });

//     return NextResponse.json(songs);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch songs" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const song = await Song.create({
//       title: body.title,
//       key: body.key,
//       lyrics: body.lyrics,
//       lyricsWithChords:
//         body.lyricsWithChords,
//     });

//     return NextResponse.json(song, {
//       status: 201,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to create song" },
//       { status: 500 }
//     );
//   }
// }




import { connectDB } from "@/lib/mongodb";
import Song from "@/models/Song";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const songs = await Song.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(songs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const song = await Song.create({
      title: body.title,
      songSequence: body.songSequence,
      key: body.key,
      lyrics: body.lyrics,
      lyricsWithChords:
        body.lyricsWithChords,
    });

    return NextResponse.json(song, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create song" },
      { status: 500 }
    );
  }
}