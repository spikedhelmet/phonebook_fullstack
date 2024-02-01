// const mongoose = require("mongoose");

// // Cancelling the program if no password input
// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// // Reading data from the console input
// const password = process.argv[2];
// const personName = process.argv[3];
// const personNumber = process.argv[4];

// // Connection to URL
// const url = `mongodb+srv://zaurhasanovdev:${password}@cluster0.qzyi0em.mongodb.net/phonebook?retryWrites=true&w=majority`;
// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// // Creating the object schema (prototype) and hard typing it
// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// // Similar to how a class extends a prototype class
// const Person = mongoose.model("Person", personSchema);

// // Fetching the previous entries and closing the connection
// const entries = Person.find({}).then((persons) => {
//   persons.forEach((person) => console.log(person.name, person.number));
//   mongoose.connection.close();
// });

// // Creating new Person object
// const person = new Person({
//   name: personName,
//   number: personNumber,
// });

// if (process.argv.length < 4) {
//   console.log(entries);
// } else {
//   person.save().then(() => {
//     console.log(`added ${personName} ${personNumber} to phonebook`);
//     mongoose.connection.close();
//   });
// }
