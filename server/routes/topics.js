// Topics route

const express = require("express");
const router = express.Router();

const db = require("../database");

// --- GET REQUESTS ---

// Get a user's topics.
router.get("/user-topics/:userId", (req, res) => {
  db.query(
    `SELECT * FROM topics WHERE user_id = '${req.params.userId}'`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: "An error occurred while retrieving the user's topics.",
          error: err,
        });
        return;
      }
      res.json(result);
    }
  );
});

// Get a topic based on the topic id.
router.get("/:topicId", (req, res) => {
  db.query(
    `SELECT * FROM topics WHERE topic_id = '${req.params.topicId}'`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: "An error occurred while retrieving the topic.",
          error: err,
        });
        return;
      }
      res.json(result);
    }
  );
});

// --- POST REQUESTS ---

// Create a new topic.
router.post("/", (req, res) => {
  const { topicId, topicName, userId } = req.body;

  // First get the user's db_id.
  db.query(`SELECT * FROM users WHERE user_id = ?`, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message:
          "An error occurred while retrieving the user's internal id for new topic creation.",
        error: err,
      });
      return;
    }

    const userDbId = result[0].db_id;

    // Create the topic.
    db.query(
      `INSERT INTO topics (topic_id, name, user_db_id) VALUES (?, ?, ?)`,
      [topicId, topicName, userDbId],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({
            message: "An error occurred while creating the topic.",
            error: err,
          });
          return;
        }
        res.json({
          message: "Topic created successfully!",
          result: result,
        });
      }
    );
  });
});

// --- PUT REQUESTS ---

// Update a topic.
router.put("/:topicId", (req, res) => {
  const { topicName } = req.body;
  db.query(
    `UPDATE topics SET name = ? WHERE topic_id = ?`,
    [topicName, req.params.topicId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: "An error occurred while updating the topic.",
          error: err,
        });
        return;
      }
      res.json(result);
    }
  );
});

// --- DELETE REQUESTS ---

// Delete a topic.
router.delete("/:topicId", (req, res) => {
  db.query(
    `DELETE FROM topics WHERE topic_id = '${req.params.topicId}'`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: "An error occurred while deleting the topic.",
          error: err,
        });
        return;
      }
      res.json({ message: "Topic successfully deleted.", result: result });
    }
  );
});

module.exports = router;
