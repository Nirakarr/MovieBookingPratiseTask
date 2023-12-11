import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import movieListingRoutes from "./routes/movieListingRoutes.js";
import movieBookingRoutes from "./routes/movieBookingRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("Images/MovieImages"));
app.use("/user", userAuthRoutes);
app.use("/movie", movieListingRoutes);
app.use("/api", movieBookingRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to MERN Movie Application</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
