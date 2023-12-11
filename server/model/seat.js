// seat.js
import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  seatnum: {
    type: Number,
    required: true,
    unique: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
  // Add an array field to store booked seats
  bookedSeats: [{ type: Number }],
});

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;
