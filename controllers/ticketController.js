const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

const purchaseTicket = async (req, res) => {
	const { eventId, selectedSeats } = req.body;

	// Fetch the event by its ID
	const event = await Event.findById(eventId);

	// Check if the event exists and has enough available tickets
	if (event && selectedSeats?.length <= event.ticketsAvailable) {
		const tickets = [];
		const updatedSeats = event.seats.map((seat) => {
			// If the seat is selected and available, mark it as sold
			if (selectedSeats.includes(seat.seatNumber) && seat.isAvailable) {
				seat.isAvailable = false;

				// Create a ticket for each selected seat
				const ticket = new Ticket({
					event: eventId,
					user: req.user._id,
					seatNumber: seat.seatNumber,
				});
				tickets.push(ticket);
			}
			return seat;
		});

		// Check if we successfully created tickets for all selected seats
		if (tickets.length !== selectedSeats.length) {
			res.status(400);
			throw new Error("One or more selected seats are unavailable.");
		}

		// Save all tickets and update the event with the new seats data
		await Ticket.insertMany(tickets);
		event.seats = updatedSeats;
		event.ticketsAvailable -= selectedSeats.length;
		await event.save();

		// Populate the event details in the created tickets
		const populatedTickets = await Ticket.find({
			_id: { $in: tickets.map((ticket) => ticket._id) },
		}).populate("event", "name");

		res.status(201).json(populatedTickets);
	} else {
		res.status(400);
		throw new Error("Event is sold out or does not exist.");
	}
};

module.exports = { purchaseTicket };
