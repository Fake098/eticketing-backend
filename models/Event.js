const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
	seatNumber: {
		type: String,
		required: true,
	},
	isAvailable: {
		type: Boolean,
		default: true,
	},
});

const eventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	venue: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	ticketsAvailable: {
		type: Number,
		required: true,
	},
	ticketPrice: {
		type: Number,
		required: true,
	},
	seats: [seatSchema],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
