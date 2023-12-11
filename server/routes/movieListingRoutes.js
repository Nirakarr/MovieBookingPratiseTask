import express from "express";
import movieBookingController from "../controller/movieController.js";
import path from "path";
import { fileURLToPath } from "url"; // Import the necessary module
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Calculate the directory path
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../Images/MovieImages")); // Use the calculated __dirname
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();
router.post(
  "/postmovies",
  upload.array("image"),
  movieBookingController.postMovie
);
router.get("/getMovies", movieBookingController.getAllMovies);
router.get("/getMoviesById/:id", movieBookingController.getMoviesById);
router.put(
  "/updateMoviesById/:id",
  movieBookingController.updateMoviesDetailsById
);
router.delete(
  "/deleteMoviesById/:id",
  movieBookingController.deleteMoviesDetailsById
);

export default router;
