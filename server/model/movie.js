import mongoose from "mongoose";
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    showtimes: {
      type: Array,
      required: true,
    },
    image: {
      type: Array,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
