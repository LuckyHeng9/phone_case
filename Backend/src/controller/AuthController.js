import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authController = {
  register: async (req, res) => {
    const { username, email, password, address, profile_picture_path } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already taken" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new User({
        username,
        email,
        role: "user",
        password: hashPassword,
        address,
        profile_picture_path,
      });

      // Save the user to the database
      await newUser.save();

      // Generate a token for the new user
      const token = getToken(newUser);

      // Respond with the token and user data
      return res.status(201).json({
        message: "User registered successfully",
        token, // Include the token in the response
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          address: newUser.address,
          profile_picture_path: newUser.profile_picture_path,
        },
      });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email is already taken" });
      }
      return res.status(500).json({ error: "Server error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = getToken(user);

      // Respond with the token and minimal user data
      return res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          email: user.email,
          address: user.address,
          profile_picture_path: user.profile_picture_path,
        },
        message: "Login successful",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  },


  logOut: async (req, res) => {
    res.status(200).json({ message: "Logout successful" });
  },

  checkAuth: async (req, res) => {
    try {
      const id = req.user.id;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ message: "Unauthenticated" });
    }
  },
};

// Helper function to generate JWT token
function getToken(user) {
  try {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_KEY, // Ensure JWT_KEY is set in your environment variables
      { expiresIn: "5h" }
    );
    return token; // Ensure that the token is returned
  } catch (error) {
    console.error("JWT Error:", error);
    throw new Error("Failed to generate token");
  }
}

export default authController;
