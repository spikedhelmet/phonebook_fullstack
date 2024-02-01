require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person"); //importing the Person model
const app = express();
const errorHandler = require("./errorHandler");

app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(":method :url :response-time :res-body"));
app.use(cors());

// morgan logic
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    res.body = body;
    originalSend.call(res, body);
  };

  next();
});

morgan.token("res-body", (req, res) => res.body);
/**********************************************************/
app.use((error, request, response, next) => {
  console.error(error.message);
  response.status(500).json({ error: error.message });
});

app.use(errorHandler);

// Info page
app.get("/info", (req, res) => {
  let date = new Date();

  Person.find({}).then((result) => {
    res.send(
      `<p>Phonebooks has info for ${result.length} people</p>
      <p>${date}</p>`
    );
  });
});

// Get all persons
app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => res.json(result));
});

// Get single person
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).end;
    })
    .catch((error) => {
      next(error);
    });

  morgan((tokens, req, res) => {});
});

// Post new person
app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number)
    return res.status(400).json({
      error: "content missing",
    });

  // Creating new Person object
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      console.log(
        `added ${savedPerson.name} ${savedPerson.number} to phonebook`
      );
      res.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

// Update person data
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      console.log(updatedPerson);
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// Delete person from array
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
