import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  // Add other fields if needed (e.g., expiration date, user association, etc.)
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
