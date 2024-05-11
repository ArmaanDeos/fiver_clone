import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import gigRoutes from "./routes/gig.routes.js";
import orderRoutes from "./routes/order.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// json file
app.use(express.json({ limit: "16kb" }));
// url data
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
// static files
app.use(express.static("public"));
app.use(cookieParser());

//* Routes declaration *//

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/gigs", gigRoutes);
app.use("/api/v1/reviews", reviewRoutes);

export { app };
