const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authController = {
  register: async (req, res) => {
    const { username, email, password, address, profile_picture_path } =
      req.body;

    if (!username || !email || !password || !address) {
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
        password: hashPassword,
        address,
        profile_picture_path,
      });

      // Save the user to the database
      await newUser.save();
      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
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
  checkAuth: async (req, res) => {
    try {
      const id = req.user.id;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({message:"Unauthentication"});
    }
  },
};

module.exports = authController;
function getToken(user) {
  try {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "5h" }
    );
  //  console.log("Generated Token:", token);  // Log the token
    return token;
  } catch (error) {
    console.error("JWT Error:", error);
    throw new Error("Failed to generate token");
  }
}
