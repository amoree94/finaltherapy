const express = require("express");
const morgan = require("morgan");

const {
	addScore,
	createUser,
	addJournalEntry,
	addSurveyByEmail,
	addResource,
	getUserByEmail,
	getJournalPage,
} = require("./handlers");

express()
	.use(morgan("tiny"))
	.use(express.json())
	.use(express.static("public"))
	//endpoints

	.patch("/scores/:userEmail", addScore)
	.post("/surveys/:userEmail", addSurveyByEmail)
	.get("/users/:userEmail", getUserByEmail)
	.post("/journals/:userEmail", addJournalEntry)
	.post("/resource/:userEmail", addResource)
	.get("/journalpage/:date/:userEmail", getJournalPage)
	.post("/users", createUser)

	// array of journals based on email.

	.get("*", (req, res) => {
		res.status(404).json({
			status: 404,
			message: "This is obviously not what you are looking for.",
		});
	})
	.listen(8000,  () => console.log(`Listening on port 8000`));
