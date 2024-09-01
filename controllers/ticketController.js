const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

const purchaseTicket = async (req, res) => {
	const { eventId } = req.body;

	const event = await Event.findById(eventId);

	if (event && event.ticketsAvailable > 0) {
		const ticket = await Ticket.create({
			event: eventId,
			user: req.user._id,
		});

		event.ticketsAvailable -= 1;
		await event.save();

		res.status(201).json(ticket);
	} else {
		res.status(400);
		throw new Error("Event is sold out or does not exist");
	}
};

module.exports = { purchaseTicket };
