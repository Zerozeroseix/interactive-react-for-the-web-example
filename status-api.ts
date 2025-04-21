import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

// Adds an artificial delay to simulate a slower network
const addDelay = (ms) => new Promise((res) => setTimeout(res, ms));

import { Sequelize, QueryTypes } from "sequelize";
const sqldb = new Sequelize({
	dialect: "sqlite",
	storage: "./status-api.db",
});

/**
 * Hello world endpoint with DB status
 */
app.get("/", (c) => {
	let dbstatus = "ok";
	try {
		sqldb.authenticate();
		console.log("DB connection successful.");
	} catch (error) {
		console.error("DB connection ERROR:", error);
		dbstatus = "error";
	}

	return c.text(`The server is up!\n\nDB status: ${dbstatus}`);
});

/**
 * Get all messages or a specific message by ID
 * @param id - The ID of the message to retrieve
 * @returns The message or all messages
 */
app.get("/messages/:id?", async (c) => {
	const id = c.req.param("id");

	const delay = Number.parseInt(c.req.query("delay"));
	if (delay > 0) {
		await addDelay(delay);
	}

	if (id) {
		const message = await sqldb.query("SELECT * FROM `statuses` WHERE id = ?", {
			replacements: [id],
			type: QueryTypes.SELECT,
		});
		return c.json(message);
	}

	const stati = await sqldb.query(
		"SELECT * FROM `statuses` ORDER BY time DESC",
		{
			type: QueryTypes.SELECT,
		},
	);

	return c.json(stati);
});

/**
 * Post a message to the DB
 * @param id - The ID of the message to retrieve
 * @returns The message or all messages
 */
app.post("/messages", async (c) => {
	const body = await c.req.json();
	const { msg, type, time } = body;

	// Insert the message into the database
	const [messageId, metadata] = await sqldb.query(
		"INSERT INTO `statuses` (msg, type, time) VALUES (?, ?, ?)",
		{
			replacements: [msg, type, time],
			type: QueryTypes.INSERT,
		},
	);

	// Get the new message
	const message = await sqldb.query("SELECT * FROM `statuses` WHERE id = ?", {
		replacements: [messageId],
		type: QueryTypes.SELECT,
	});

	const delay = c.req.query("delay");
	if (delay) {
		await addDelay(Number.parseInt(delay, 10));
	}

	return c.json(
		{
			message: message[0],
			metadata,
		},
		201,
	);
});

/**
 * Run the server
 */
serve(
	{
		fetch: app.fetch,
		port: 4000,
		hostname: "0.0.0.0", // If not running on Codespaces, you might need to use "localhost" or remove this line
	},
	(info) => {
		console.log(`Server is running: http://localhost:${info.port}`);
	},
);
