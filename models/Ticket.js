const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ticketSchema = new mongoose.Schema(
	{
		event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
			required: true,
		},
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		seatNumber: { type: String, required: true }, // Track the specific seat number
		code: { type: String, required: true, unique: true, default: uuidv4 },
		isValid: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
