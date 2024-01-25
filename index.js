const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(morgan(":method :url :response-time :res-body"));
app.use(cors());

app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    res.body = body;
    originalSend.call(res, body);
  };
  next();
});

morgan.token("res-body", (req, res) => res.body);

// Data
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Info page
app.get("/info", (req, res) => {
  let date = new Date();
  const info = `
    <p>Phonebooks has info for ${persons.length} people</p>
    <p>${date}</p>
    `;
  res.send(info);
});

// Get all persons
app.get("/api/persons", (req, res) => res.json(persons));

// Get single person
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  morgan((tokens, req, res) => {});

  if (person) res.json(person);
  else res.status(404).end();
});

// Post new person
app.post("/api/persons", (req, res) => {
  const body = req.body;
  function randomId() {
    return Math.floor(Math.random() * 100);
  }

  if (!body.name || !body.number)
    return res.status(400).json({
      error: "content missing",
    });

  const newPerson = {
    id: randomId(),
    name: body.name,
    number: body.number,
  };

  if (persons.map((p) => p.number == body.number))
    return res.status(400).json({ error: "name must be unique" });

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

// Delte person from array
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
