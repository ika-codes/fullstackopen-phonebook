const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

let persons = [
	{
		name: "Samantha Smith",
		number: "4842384238234",
		id: 2
	},
	{
		name: "Anna Smith",
		number: "0287351214",
		id: 3
	},
	{
		name: "Berty Gin",
		number: "9381237164",
		id: 8
	},
	{
		name: "Ada Lovelace",
		number: "938262545",
		id: 9
	}
];

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
	res.json(persons);
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

const generateId = () => {
	let min = 0;
	let max = 999999;
	return Math.floor(Math.random() * (max - min)) + min;
};

app.post("/api/persons", (req, res) => {
	const body = req.body;

	if (!body.name) {
		return res.status(400).json({
			error: "Name missing"
		});
	} else if (!body.number) {
		return res.status(400).json({
			error: "Number missing"
		});
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId()
	};

	persons = persons.concat(person);

	res.json(person);
});

// DELETE requests

app.delete("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	persons = persons.filter(person => person.id !== id);

	res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
