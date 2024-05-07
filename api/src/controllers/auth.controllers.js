import { generateAccessToken } from "../middlewares/jwt/jwt.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcrypt";

//* RegisterUser Controller *//
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, country } = req.body;
  if (!username || !email || !password || !country) {
    throw new ApiError(400, "All fields are required");
  }

  // hash password
  const hashPassword = bcrypt.hashSync(password, 10);

  // Check if user already exists by email or username
  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password: hashPassword,
    country,
  });

  // Remove password field from db
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering user");

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Registered successfully"));
});

//* LoginUser Controller *//
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if ((!username && !email) || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Find user by username or email
  const user = await User.findOne({ $or: [{ username }, { email }] });

  // Check if user exists
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  // Compare passwords
  const isCorrectPassword = bcrypt.compareSync(password, user.password);
  if (!isCorrectPassword) {
    throw new ApiError(400, "Invalid username or password");
  }

  // Remove password field from the user object
  const loggedInUser = await User.findById(user._id).select("-password");

  // Generate access token
  generateAccessToken(200, loggedInUser, res);
});

//* LogoutUser Controller *//
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
    sameSite: "none",
  });

  res.status(200).json(new ApiResponse(200, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
