const Event = require("../models/Event");

const getEvents = async (req, res) => {
	const events = await Event.find({});
	res.json(events);
};

const getEventById = async (req, res) => {
	const event = await Event.findById(req.params.id);

	if (event) {
		res.json(event);
	} else {
		res.status(404);
		throw new Error("Event not found");
	}
};

module.exports = { getEvents, getEventById };
