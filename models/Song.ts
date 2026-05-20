// import mongoose, { Schema, models, model } from "mongoose";

// const SongSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     key: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     lyrics: {
//       type: String,
//       default: "",
//     },

//     lyricsWithChords: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Song =
//   models.Song || model("Song", SongSchema);

// export default Song;


import mongoose, { Schema, models, model } from "mongoose";

const SongSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    songSequence: {
      type: String,
      default: "",
      trim: true,
    },

    key: {
      type: String,
      default: "",
      trim: true,
    },

    lyrics: {
      type: String,
      default: "",
    },

    lyricsWithChords: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Song =
  models.Song || model("Song", SongSchema);

export default Song;