import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const SetlistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    leaders: {
      type: [String],
      default: [],
    },

    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Setlist =
  models.Setlist ||
  model("Setlist", SetlistSchema);

export default Setlist;