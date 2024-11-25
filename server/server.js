// Backend server application for QuizMe.

// load environment variables
require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

// Import CORS (used for development)
const cors = require("cors");

// IP address restriction middleware (for production)
const clientOrigin = "https://quizme.naspoapps.com";
function restrictAccess(req, res, next) {
  if (req.headers.origin === clientOrigin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

// Apply middleware
app.use(express.json()); // for parsing application/json

// Enable CORS with express for development environment, otherwise let Nginx handle it in production.
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

// Enable IP address restriction middleware in production.
if (process.env.NODE_ENV !== "development") {
  app.use(restrictAccess);
}

// Routes
app.get("/", (req, res) => {
  res.send("Try /users, /topics, or /flashcards!");
});

const usersRouter = require("./routes/users");
const topicsRouter = require("./routes/topics");
const flashcardsRouter = require("./routes/flashcards");

app.use("/users", usersRouter);
app.use("/topics", topicsRouter);
app.use("/flashcards", flashcardsRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));
