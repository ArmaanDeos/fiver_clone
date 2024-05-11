import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// isAuthorizedUser middlewares
const isAuthorizedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);

  if (!token) {
    throw new ApiError(
      401,
      "Token not found. Please login to access this resource",
      "Error while authenticating user"
    );
  }
  const decodedData = jwt.verify(
    String(token),
    process.env.ACCESS_TOKEN_SECRET,
    async (err, payload) => {
      if (err)
        throw new ApiError(
          401,
          "You are not authorized to access this resource",
          "Error while authenticating user"
        );
      req.userId = payload.id;
      req.isSeller = payload.isSeller;
    }
  );
  req.user = await User.findById(decodedData.id);
  next();
});

export { isAuthorizedUser };
