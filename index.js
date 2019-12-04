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

	Person.find({})
		.then(persons => {
			res.send(`<p>Phonebook has info for ${persons.length} people</p>
	<p>${date}</p>`);
		})
		.catch(error => next(error));
});

app.get("/api/persons", (req, res, next) => {
	Person.find({})
		.then(persons => {
			res.json(persons.map(person => person.toJSON()));
		})
		.catch(error => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person.toJSON());
			} else {
				res.status(404).end();
			}
		})
		.catch(error => next(error));
});

// POST requests

app.post("/api/persons", (req, res, next) => {
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

	person
		.save()
		.then(savedPerson => savedPerson.toJSON())
		.then(savedAndFormattedPerson => res.json(savedAndFormattedPerson))
		.catch(error => next(error));
});

// PUT requests

app.put("/api/persons/:id", (req, res, next) => {
	const body = req.body;

	const person = {
		name: body.name,
		number: body.number
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then(updatedPerson => {
			res.json(updatedPerson.toJSON());
		})
		.catch(error => next(error));
});

// DELETE requests

app.delete("/api/persons/:id", (req, res) => {
	Person.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end();
		})
		.catch(error => next(error));
});

//Error handlers

const errorHandler = (error, req, res, next) => {
	console.error(error.message);

	if (error.name === "CastError" && error.kind === "ObjectId") {
		return res.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

// PORT

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
