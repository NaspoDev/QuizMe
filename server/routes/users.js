// Users route

const express = require("express");
const router = express.Router();

const db = require("../database");

// --- POST REQUESTS ---

// TODO: Change this, i just copied and pasted it from an old project.
// create a new user
router.post("/", (req, res) => {
  db.query(`INSERT INTO users () VALUES ()`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while creating the user.",
        error: err,
      });
      return;
    }
    res.json({
      message: "User created successfully!",
      result: result,
    });
  });
});

module.exports = router;
