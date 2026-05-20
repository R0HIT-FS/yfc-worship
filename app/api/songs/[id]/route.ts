// import { connectDB } from "@/lib/mongodb";
// import Song from "@/models/Song";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   {
//     params,
//   }: {
//     params: Promise<{ id: string }>;
//   }
// ) {
//   try {
//     await connectDB();

//     const { id } = await params;

//     const song = await Song.findById(id);

//     if (!song) {
//       return NextResponse.json(
//         { error: "Song not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(song);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch song" },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   req: Request,
//   {
//     params,
//   }: {
//     params: Promise<{ id: string }>;
//   }
// ) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const { id } = await params;

//     const updatedSong =
//       await Song.findByIdAndUpdate(
//         id,
//         {
//           title: body.title,
//           key: body.key,
//           lyrics: body.lyrics,
//           lyricsWithChords:
//             body.lyricsWithChords,
//         },
//         {
//           new: true,
//         }
//       );

//     if (!updatedSong) {
//       return NextResponse.json(
//         { error: "Song not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updatedSong);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update song" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: Request,
//   {
//     params,
//   }: {
//     params: Promise<{ id: string }>;
//   }
// ) {
//   try {
//     await connectDB();

//     const { id } = await params;

//     const deletedSong =
//       await Song.findByIdAndDelete(id);

//     if (!deletedSong) {
//       return NextResponse.json(
//         { error: "Song not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       message: "Song deleted",
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to delete song" },
//       { status: 500 }
//     );
//   }
// }




import { connectDB } from "@/lib/mongodb";
import Song from "@/models/Song";
import { NextResponse } from "next/server";

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

    const song = await Song.findById(id);

    if (!song) {
      return NextResponse.json(
        { error: "Song not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(song);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch song" },
      { status: 500 }
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

    const updatedSong =
      await Song.findByIdAndUpdate(
        id,
        {
          title: body.title,
          songSequence:
            body.songSequence,
          key: body.key,
          lyrics: body.lyrics,
          lyricsWithChords:
            body.lyricsWithChords,
        },
        {
          new: true,
        }
      );

    if (!updatedSong) {
      return NextResponse.json(
        { error: "Song not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSong);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update song" },
      { status: 500 }
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

    const deletedSong =
      await Song.findByIdAndDelete(id);

    if (!deletedSong) {
      return NextResponse.json(
        { error: "Song not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Song deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete song" },
      { status: 500 }
    );
  }
}