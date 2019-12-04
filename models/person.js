const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
mongoose.set("useFindAndModify", false);
const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => {
		console.log("connected to MongoDB", result);
	})
	.catch(error => {
		console.log("error connecting to MongoDB:", error.message);
	});

const personSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 3,
			unique: true
		},
		number: {
			type: String,
			minlength: 8,
			required: true
		}
	},
	{ collection: "persons" }
);

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model("Person", personSchema);
