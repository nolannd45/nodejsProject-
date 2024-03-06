import { model, Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    idUser: String,
    idHotel: String,
    dateStart: Date,
    dateEnd: Date,
  },
  { timestamps: true }
);

export default model("Ticket", ticketSchema);