const mongoose = require("mongoose");
const Event = require("./models/Event"); // Adjust the path as needed
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

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

// Define multiple example events
const exampleEvents = [
	{
		name: "Rock Concert",
		venue: "Madison Square Garden",
		date: new Date("2024-09-15"),
		description: "An epic night of rock and roll.",
		ticketsAvailable: 100,
		ticketPrice: 75,
		seats: generateSeats(100), // Generate seats with 20 columns
	},
	{
		name: "Jazz Festival",
		venue: "Central Park",
		date: new Date("2024-10-05"),
		description: "A relaxing evening of jazz music.",
		ticketsAvailable: 300,
		ticketPrice: 50,
		seats: generateSeats(300), // Generate seats with 20 columns
	},
	{
		name: "Soccer Match",
		venue: "Yankee Stadium",
		date: new Date("2024-11-10"),
		description: "An exciting soccer match between top teams.",
		ticketsAvailable: 200,
		ticketPrice: 100,
		seats: generateSeats(200), // Generate seats with 20 columns
	},
];

// Seed the events
const seedEvents = async () => {
	try {
		await Event.deleteMany(); // Clear existing events
		await Event.insertMany(exampleEvents); // Insert example events
		console.log("Example events added to the database");
	} catch (err) {
		console.error("Error inserting events:", err);
	} finally {
		mongoose.connection.close(); // Close the connection
	}
};

// Run the seeding script
seedEvents();
