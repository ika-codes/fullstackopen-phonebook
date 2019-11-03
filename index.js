const express = require("express");
const app = express();

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

app.get("/", (req, res) => {
	res.send("<h1>Hello World!</h1>");
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

app.delete("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	persons = persons.filter(person => person.id !== id);

	res.status(204).end();
});

app.get("/info", (req, res) => {
	let date = new Date();
	res.send(`<p>Phonebook has info for ${persons.length} people</p>
	<p>${date}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
