const Ticket = require("../models/Ticket");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		res.status(400).json({ message: "User already exists" });
	} else {
		const user = await User.create({
			name,
			email,
			password,
		});
		if (user) {
			res.status(201).json({
				success: true,
			});
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	}
};

const authUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Find the user by email
		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			// Fetch the user's tickets and populate event names
			const tickets = await Ticket.find({ user: user._id }).populate(
				"event",
				"name"
			); // Populate the event name

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id, user.isAdmin),
				tickets, // Include tickets data with populated event names
			});
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.error("Error authenticating user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { registerUser, authUser };
