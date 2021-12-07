const express = require("express");

const PORT = 8000;

var app = express();

app.use(express.json());

app.get("/await", (req, res) => {
	res.status(200).json({ status: 200, data: "final P" });
});

const server = app.listen(PORT, function () {
	console.info("🌍 Listening on port " + server.address().port);
});
