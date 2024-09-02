const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

// Set up CORS
app.use(
	cors({
		origin: "http://localhost:5173", // Replace with your Vite dev server URL or your frontend URL
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true, // Enable this if you need to send cookies with the request
	})
);
app.use(express.json());

// Configure Rate Limiting
const generalLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100, // Limit each IP to 90 requests per `windowMs`
	message: "Too many requests from this IP, please try again after 5 minutes",
});

// Apply the rate limiter to all requests
app.use(generalLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Export the app as a module
module.exports = app;
