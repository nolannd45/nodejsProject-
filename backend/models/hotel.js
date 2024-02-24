import { model, Schema } from "mongoose";

const HotelSchema = new Schema(
  {
    name: String,
    location: String,
    description: String,
    picture_list: Array,
  },
  { timestamps: true }
);

export default model("Hotel", HotelSchema);