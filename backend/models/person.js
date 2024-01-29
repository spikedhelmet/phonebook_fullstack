// Mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Connection to URL
const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => console.log("connected to MongdoDB"))
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Creating the object schema (prototype) and hard typing it
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean,
});

// Because _id is actually an object we transform it into a string. Then we get rid of old id and version
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);

// // Similar to how a class extends a prototype class
// const Person = mongoose.model("Person", personSchema);
