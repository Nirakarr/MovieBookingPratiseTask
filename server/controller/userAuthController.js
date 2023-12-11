import hashPassword, { comparePassword } from "../helpers/authHelpers.js";
import Token from "../model/token.js";
import userModel from "../model/user.js";
import { validationResult } from "express-validator";
import JWT from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    //req credentials from req.body
    const { username, email, password, role } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!username || !email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if model already exists
    const existingModel = await userModel.findOne({ email });

    if (existingModel) {
      return res.status(409).send({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create and save the model using the create method
    const newModel = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      model: newModel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

// POST LOGIN
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Check if the email is registered
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare the provided password with the hashed password from the database
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Determine the role of the user
    const role = user.role || "user";

    // Define different secret keys for user and admin
    const userSecretKey = process.env.USER_ACCESS_SECRET_KEY;
    const adminSecretKey = process.env.ADMIN_ACCESS_SECRET_KEY;

    // Select the appropriate secret key based on the user's role
    const secretKey = role === "admin" ? adminSecretKey : userSecretKey;

    // Generate access token based on the user's role and the selected secret key
    const accessToken = JWT.sign({ _id: user._id, role }, secretKey, {
      expiresIn: "10m",
    });

    const newToken = new Token({ token: accessToken });
    await newToken.save();

    res.status(200).json({
      accessToken,
      role,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Login",
      error: error.message,
    });
  }
};
