const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		date: { type: Date, required: true },
		venue: { type: String, required: true },
		ticketsAvailable: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
