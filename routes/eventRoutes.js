const express = require("express");
const {
	getEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

// CRUD routes for events
router.route("/").get(getEvents).post(createEvent);
router.route("/:id").get(getEventById).put(updateEvent).delete(deleteEvent);

module.exports = router;
