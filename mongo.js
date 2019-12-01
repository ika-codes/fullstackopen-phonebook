const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log(
		"Please provide all necessary info in order: password name number, or just password to list all entries."
	);
	process.exit(1);
}

const password = process.argv[2];
const providedName = process.argv[3];
const providedNumber = process.argv[4];

const mongoUrl = `mongodb+srv://fullstackOpen:${password}@ikacodescluster-0gpf8.mongodb.net/PhonebookApp?retryWrites=true`;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema(
	{
		name: String,
		number: String
	},
	{ collection: "persons" }
);

const Person = mongoose.model("Person", personSchema);

const person = new Person({
	name: providedName,
	number: providedNumber
});

if (process.argv.length == 3) {
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person);
		});
		mongoose.connection.close();
	});
} else if (process.argv.length == 5) {
	person.save().then(response => {
		console.log("person saved!");
		mongoose.connection.close();
	});
}
