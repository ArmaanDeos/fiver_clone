import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// isAuthorizedUser middlewares
const isAuthorizedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new ApiError(401, "You are not authorized");

  const user = await User.findById(req.params.id);

  const decodedData = jwt.verify(
    String(token),
    process.env.ACCESS_TOKEN_SECRET,
    (err, payload) => {
      if (payload.id !== user._id.toString()) {
        return res
          .status(401)
          .json(new ApiResponse(401, "You can delete only your account"));
      }
    }
  );

  req.user = await User.findById(decodedData.id);
  next();
});

export { isAuthorizedUser };
