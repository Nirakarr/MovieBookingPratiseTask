import Movie from "../model/movie.js";

const postMovie = async (req, res) => {
  try {
    const { title, genre, showtimes, description, ticketPrice } = req.body;

    const arrImages = req.files.map((file) => file.filename);

    // Create a new movie
    const movie = new Movie({
      title,
      genre,
      showtimes,
      description,
      image: arrImages,
      ticketPrice,
    });

    await movie.save();
    res.status(201).json({ message: "Movie added successfully", movie });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find({});
    res.status(201).json({ message: "All Movies", allMovies });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMoviesById = async (req, res) => {
  try {
    const movieById = await Movie.findById(req.params.id);
    if (!movieById) {
      res.status(404).json({ message: "No Movie found By this Id" });
    }
    res.status(201).json({ message: "Movie by ID", movieById });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMoviesDetailsById = async (req, res) => {
  try {
    const updateId = req.params.id; // Get the movie ID from the URL parameter

    // Check if the card exists by ID
    const existingPost = await Movie.findById(updateId);

    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, msg: "Movie not found by this id" });
    }
    // Access form data from req.fields
    const formData = req.body;

    // Create an update object based on the form data
    const updateObject = {
      title: formData.title || existingPost.title,
      genre: formData.genre || existingPost.genre,
      showtimes: formData.showtimes || existingPost.showtimes,
      totalSeats: formData.totalSeats || existingPost.totalSeats,
      description: formData.description || existingPost.description,
      ticketPrice: formData.ticketPrice || existingPost.ticketPrice,
    };
    // Handle image updates
    if (req.file && req.file.filename) {
      // Assuming the image field is named "image"
      const newImage = req.file.filename;
      updateObject.image = newImage; // Replace existing image with the new one
    }
    // Use findByIdAndUpdate to update the movie
    const updatedPost = await Movie.findByIdAndUpdate(updateId, updateObject, {
      new: true,
    });
    res.status(200).json({
      success: true,
      msg: "Movie details updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ success: false, msg: error.message });
  }
};

const deleteMoviesDetailsById = async (req, res) => {
  try {
    const paramsid = await Movie.findByIdAndDelete(req.params.id);
    if (!paramsid) {
      return res
        .status(402)
        .json({ message: "No Movie found By this Id to delete" });
    }
    res.status(201).json({ message: `Movie Deleted Successfully` });
  } catch (error) {
    res.status(402).json({ success: false, message: error.message });
  }
};

export default {
  postMovie,
  getAllMovies,
  getMoviesById,
  updateMoviesDetailsById,
  deleteMoviesDetailsById,
};
