require("dotenv").config();
// Mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Connection to URL
const url = process.env.MONGODB_URI;
// const password = process.env.MONGODB_PASSWORD;
// const url = `mongodb+srv://zaurhasanovdev:${password}@cluster0.qzyi0em.mongodb.net/phonebook?retryWrites=true&w=majority`;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => console.log("connected to MongdoDB"))
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Creating the object schema (prototype) and hard typing it
const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
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
