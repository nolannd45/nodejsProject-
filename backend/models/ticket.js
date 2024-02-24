import { model, Schema } from "mongoose";
import { bool } from "yup";

const ticketSchema = new Schema(
  {
    idTrain: String,
    idUser: String,
    nametrain: String,
    start_station: String,
    end_station: String,
    time_of_departure: Date,
    use: Boolean
  },
  { timestamps: true }
);

export default model("Ticket", ticketSchema);