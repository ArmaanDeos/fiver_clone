import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Review } from "../models/review.models.js";
import { Gig } from "../models/gig.models.js";

//* CreateReview Controller *//
const createReview = asyncHandler(async (req, res) => {
  if (req.isSeller) throw new ApiError(403, "Only buyer can create a review");

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  const exitsReview = await Review.findOne({
    gigId: req.body.gigId,
    userId: req.userId,
  });

  if (exitsReview)
    throw new ApiError(400, "You have already reviewed this gig");

  const savedReview = await newReview.save();

  await Gig.findByIdAndUpdate(
    req.body.gigId,
    {
      $inc: { totalStars: req.body.star, starsNum: 1 },
    },

    res
      .status(200)
      .json(new ApiResponse(200, savedReview, "Review created successfully"))
  );
});

//* DeleteReview Controller *//
const deleteReview = asyncHandler(async (req, res) => {});

//* GetReview Controller *//
const getReview = asyncHandler(async (req, res) => {
  const review = await Review.find({ gigId: req.params.gigId });
  res
    .status(200)
    .json(new ApiResponse(200, review, "Review found successfully"));
});

export { createReview, deleteReview, getReview };
