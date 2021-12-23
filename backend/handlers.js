const e = require("express");
const { MongoClient } = require("mongodb"); // calls lib
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const addScore = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("Project");

	const scores = await db.collection("Scores");
	client.close();

	res.status(200).json({ status: 200, message: "is workin!" });
};

const createUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("Project");

	const users = await db.collection("users");
	const user = await users.findOne({ email: req.body.email });
	if (user) {
		res.status(200).json({ status: 200, message: "user already exists" });
	} else {
		await users.insertOne({
			...req.body,
			journal: [],
			score: null,
			resources: [],
		});
		res.status(200).json({ status: 200, message: "user created" });
	}
	client.close();
};

const addJournalEntry = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("Project");

	const users = await db.collection("users");
	await users.updateOne(
		{ email: req.params.userEmail },
		{ $push: { journal: req.body } }
	);

	console.log(req.body, "body");
	console.log(req.params, "params");

	res.status(200).json({status:200, message: "success" });
	client.close();
};
const addResource = async (req, res) => {
	console.log(req.body, "body");
	console.log(req.params, "params");
	
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("Project");

	const users = await db.collection("users");
	await users.updateOne(
		{ email: req.params.userEmail },
		{ $push: { resources: req.body } }
	);


	res.status(200).json({status: 200, message: "success" });
	client.close();
};

const addSurveyByEmail = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("Project");

	const users = await db.collection("users");
	await users.updateOne(
		{ email: req.params.userEmail },
		{ $set: { score: req.body.finalScore } }
	);

	res.status(200).json({ message: "addSurvey endpoint" });
	client.close();
};

const getUserByEmail = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("Project");

	const users = await db.collection("users");

	const user = await users.findOne({ email: req.params.userEmail });

	user
		? res.status(200).json({ status: 200, data: user })
		: res.status(400).json({ status: 400, message: "User not Found" });
	client.close()
};

const getJournalPage = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("Project");

	const users = await db.collection("users");

	const user = await users.findOne({ email: req.params.userEmail });
	
	const journal =  user.journal.find((journalEntry)=>{
		return journalEntry.date === req.params.date
	})

	journal
		? res.status(200).json({ status: 200, data: journal })
		: res.status(400).json({ status: 400, message: "User not Found" });
client.close()
}


module.exports = {
	addScore,
	createUser,
	addJournalEntry,
	addSurveyByEmail,
	addResource,
	getUserByEmail,
	getJournalPage,
};
