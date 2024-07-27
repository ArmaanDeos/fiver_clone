import { Gig } from "../models/gig.models.js";
import { Order } from "../models/order.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

import Stripe from "stripe";

//* PaymentIntent Controller *//
const payment = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);

  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  // create order
  const newOrder = new Order({
    gigId: gig._id,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    img: gig.coverImg,
    title: gig.title,
    payment_intent: paymentIntent.id,
  });

  if (!newOrder) throw new ApiError(500, "Something went wrong");

  await newOrder.save();

  res.status(200).send({ clientSecret: paymentIntent.client_secret });
});

//* ConfirmOrder Controller *//
const confirmOrder = asyncHandler(async (req, res) => {
  const orders = await Order.findOneAndUpdate(
    {
      payment_intent: req.body.payment_intent,
    },
    {
      $set: {
        isCompleted: true,
      },
    }
  );
  res.status(200).json(new ApiResponse(200, orders, "Order confirmed"));
});

//* GetOrder Controller *//
const getOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
    isCompleted: true,
  });

  if (!orders) throw new ApiError(404, "Orders not found");

  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders found successfully"));
});

//* DeleteOrder Controller *//
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, "Order not found");
  if (order.buyerId !== req.userId) {
    throw new ApiError(403, "Unauthorized! You can only delete your own order");
  }

  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  if (!deletedOrder) throw new ApiError(500, "Something went wrong");
  res.status(200).json(new ApiResponse(200, "Order deleted"));
});

//* UpdateOrder Controller *//
const updateOrder = asyncHandler(async (req, res) => {});

export { getOrder, deleteOrder, updateOrder, payment, confirmOrder };
