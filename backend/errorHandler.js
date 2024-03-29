function errorHandler(error, request, response, next) {
  console.error(error.message);

  if (error.name === "Cast Error") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ ValidationError: error.message });
  }

  next(error);
}

module.exports = errorHandler;
