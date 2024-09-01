const mongoose = require("mongoose");
const Event = require("./models/Event"); // Adjust the path as needed
const dotenv = require("dotenv");
const Ticket = require("./models/Ticket");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const createTicketsForEvent = async (eventId, seatNumbers, price) => {
	const tickets = seatNumbers.map((seatNumber) => ({
		event: eventId,
		seatNumber,
		price,
	}));

	return Ticket.insertMany(tickets);
};

const seedTickets = async () => {
	try {
		// Retrieve example events from the database
		const events = await Event.find();

		if (events.length === 0) {
			console.log("No events found. Please add events first.");
			return;
		}

		// For each event, create a set of example tickets
		for (const event of events) {
			const seatNumbers = ["A1", "A2", "A3", "B1", "B2", "B3"]; // Example seat numbers
			await createTicketsForEvent(event._id, seatNumbers, event.ticketPrice);
			console.log(`Tickets created for event: ${event.name}`);
		}

		console.log("Example tickets added to the database");
		mongoose.connection.close(); // Close the connection after insertion
	} catch (err) {
		console.error("Error inserting tickets:", err);
	}
};

seedTickets();
