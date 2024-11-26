// Flashcards route

const express = require("express");
const router = express.Router();

const db = require("../database");

// --- GET REQUESTS ---

// Get a user's flashcards by topic.
router.get("/topic/:topicId", (req, res) => {
  // First get the topic's db_id.
  db.query(
    `SELECT * FROM topics WHERE topic_id = '${req.params.topicId}'`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message:
            "An error occurred while retrieving the topic's internal id for retrieving it's flashcards.",
          error: err,
        });
        return;
      }

      const topicDbId = result[0].db_id;

      // Get the topic's flashcards.
      db.query(
        `SELECT * FROM flashcards WHERE topic_db_id = ${topicDbId}`,
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({
              message: "An error occurred while retrieving flashcards.",
              error: err,
            });
            return;
          }
          res.json({
            message: `Flashcards for topic id ${req.params.topicId} retrieved.`,
            result: result,
          });
        }
      );
    }
  );
});

// --- POST REQUESTS ---

// Create a new flashcard.
router.post("/", (req, res) => {
  const { flashcardId, question, answer, topicId } = req.body;

  // First get the topic's and user's db_id.
  db.query(
    `SELECT * FROM topics WHERE topic_id = ?`,
    [topicId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message:
            "An error occurred while retrieving the topic's internal id for new flashcard creation.",
          error: err,
        });
        return;
      }

      const topicDbId = result[0].db_id;
      const userDbId = result[0].user_db_id;

      // Create the flashcard.
      db.query(
        `INSERT INTO flashcards (flashcard_id, question, answer, topic_db_id, user_db_id) VALUES (?, ?, ?, ?, ?)`,
        [flashcardId, question, answer, topicDbId, userDbId],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({
              message: "An error occurred while creating the flashcard.",
              error: err,
            });
            return;
          }
          res.json({
            message: "Flashcard created successfully!",
            result: result,
          });
        }
      );
    }
  );
});

// --- PUT REQUESTS ---

// Update a flashcard.
router.put("/:flashcardId", (req, res) => {
  const { question, answer } = req.body;
  db.query(
    `UPDATE flashcards SET question = ?, answer = ? WHERE flashcard_id = ?`,
    [question, answer, req.params.flashcardId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: "An error occurred while updating the flashcard.",
          error: err,
        });
        return;
      }
      res.json(result);
    }
  );
});

// --- DELETE REQUESTS ---

// Delete a flashcard.
router.delete("/:flashcardId", (req, res) => {
  db.query(
    `DELETE FROM flashcards WHERE flashcard_id = '${req.params.flashcardId}'`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: "An error occurred while deleting the flashcard.",
          error: err,
        });
        return;
      }
      res.json({ message: "Flashcard successfully deleted.", result: result });
    }
  );
});

module.exports = router;
