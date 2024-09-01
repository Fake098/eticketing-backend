const Event = require("../models/Event");

// Get all events
exports.getEvents = async (req, res) => {
	try {
		const events = await Event.find();
		res.json(events);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get a specific event
exports.getEventById = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		res.json(event);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Function to generate seats
const generateSeats = (totalSeats) => {
	const seats = [];
	const columns = 20; // Fixed number of columns
	const rows = Math.ceil(totalSeats / columns); // Calculate rows based on total seats and columns

	for (let row = 1; row <= rows; row++) {
		for (let col = 1; col <= columns; col++) {
			if ((row - 1) * columns + col <= totalSeats) {
				// Ensure we don't exceed totalSeats
				const seatNumber = String.fromCharCode(64 + row) + col;
				seats.push({ seatNumber, isAvailable: true });
			}
		}
	}
	return seats;
};

// Create a new event
exports.createEvent = async (req, res) => {
	try {
		// Generate seats based on the ticketsAvailable from the request body
		const seats = generateSeats(req.body.ticketsAvailable);

		// Create a new event with the generated seats
		const event = new Event({
			...req.body,
			seats, // Add the generated seats to the event
		});

		const newEvent = await event.save();
		res.status(201).json(newEvent);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Update an event
exports.updateEvent = async (req, res) => {
	try {
		const updatedEvent = await Event.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.json(updatedEvent);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Delete an event
exports.deleteEvent = async (req, res) => {
	try {
		await Event.findByIdAndDelete(req.params.id);
		res.json({ message: "Event deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
