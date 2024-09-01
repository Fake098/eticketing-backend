const express = require("express");
const { getEvents, getEventById } = require("../controllers/eventController");

const router = express.Router();

router.route("/").get(getEvents);
router.route("/:id").get(getEventById);

module.exports = router;
