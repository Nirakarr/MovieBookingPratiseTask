// movieController.js
import Movie from "../model/movie.js";
import Seat from "../model/seat.js";

export const movieBookingController = async (req, res) => {
  try {
    const { showtime, seatnum } = req.body; // Extract seatnum from the request body
    const movieId = req.params.movieId;
    const userId = req.params.userId;

    // Check if movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Check if the seat is already booked
    const existingSeat = await Seat.findOne({ seatnum, booked: true });
    if (existingSeat) {
      return res.status(400).json({ error: "Seat already booked" });
    }

    // Check if the total number of booked seats for the movie is less than 50
    const totalBookedSeats = await Seat.countDocuments({ booked: true });
    if (totalBookedSeats >= 50) {
      return res
        .status(400)
        .json({ error: "No available seats for this movie" });
    }

    // Create a booking
    const newBooking = {
      movieId,
      userId,
      showtime,
    };

    // Save the booking
    await Seat.updateOne(
      { seatnum },
      {
        $set: { booked: true },
        $push: { bookedSeats: seatnum },
      }
    );

    res.json({
      message: "Booking successful",
      booking: newBooking,
      totalBookedSeats: totalBookedSeats + 1,
      updatedBookedSeats: existingSeat ? [seatnum] : [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
