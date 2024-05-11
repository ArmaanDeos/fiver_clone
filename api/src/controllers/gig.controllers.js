import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Gig } from "../models/gig.models.js";

//* CreateGig Controller *//
const createGig = asyncHandler(async (req, res) => {
  if (!req.isSeller) throw new ApiError(403, "Only seller can create a gig");

  const newGig = await Gig.create({
    userId: req.userId,
    ...req.body,
  });

  if (!newGig) throw new ApiError(500, "Something went wrong");

  const savedGig = await newGig.save();
  res
    .status(200)
    .json(new ApiResponse(200, savedGig, "Gig created successfully"));
});

//* DeleteGig Controller *//
const deleteGig = asyncHandler(async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) throw new ApiError(404, "Gig not found");

  if (gig.userId !== req.userId)
    throw new ApiError(403, "Unauthorized! You can only delete your own gig");

  await Gig.findByIdAndDelete(req.params.id);

  res.status(200).json(new ApiResponse(200, "Gig deleted successfully"));
});

//* GetSingleGig Controller *//
const getSingleGig = asyncHandler(async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) throw new ApiError(404, "Gig not found");
  res.status(200).json(new ApiResponse(200, gig, "Gig found successfully"));
});

//* GetGigs Controller *//
const getGigs = asyncHandler(async (req, res) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  // Pagination
  const page = parseInt(q.page) || 1;
  const limit = parseInt(q.limit) || 10;
  const skip = (page - 1) * limit;

  const gigs = await Gig.find(filters)
    .sort({ [q.sort]: -1 })
    .skip(skip)
    .limit(limit);
  res.status(200).json(new ApiResponse(200, gigs, "Gigs fetched successfully"));
});

export { createGig, deleteGig, getSingleGig, getGigs };
