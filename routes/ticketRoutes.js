const express = require("express");
const {
	purchaseTicket,
	getTicketsForEvent,
	getAllTickets,
} = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/purchase", protect, purchaseTicket);
router.get("/mytickets", protect, getAllTickets);
router.get("/events/:eventId", protect, getTicketsForEvent);
module.exports = router;
