// Users route

const express = require("express");
const router = express.Router();

const db = require("../database");

// --- POST REQUESTS ---

// Create a new user.
router.post("/", (req, res) => {
  const { userId, authProvider } = req.body;
  db.query(
    `INSERT INTO users (user_id, auth_provider) VALUES (?, ?)`,
    [userId, authProvider],
    (err, result) => {
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
    }
  );
});

module.exports = router;
