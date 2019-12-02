require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(bodyParser.json());
app.use(express.static("build"));
app.use(cors());

// Backend logging

morgan.token("postRequest", function(req) {
	if (req.method == "POST") {
		return JSON.stringify(req.body);
	}
});

app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :postRequest"
	)
);

// GET requests

app.get("/", (req, res) => {
	res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
	let date = new Date();
	res.send(`<p>Phonebook has info for ${persons.length} people</p>
	<p>${date}</p>`);
});

app.get("/api/persons", (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons.map(person => person.toJSON()));
	});
});

app.get("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find(person => person.id === id);

	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

// POST requests

app.post("/api/persons", (req, res) => {
	const body = req.body;

	if (body.name === undefined) {
		return res.status(400).json({
			error: "Name missing"
		});
	} else if (body.number === undefined) {
		return res.status(400).json({
			error: "Number missing"
		});
	}

	const person = new Person({
		name: body.name,
		number: body.number
	});

	person.save().then(savedPerson => {
		res.json(savedPerson.toJSON());
	});
});

// DELETE requests

app.delete("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	persons = persons.filter(person => person.id !== id);

	res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
