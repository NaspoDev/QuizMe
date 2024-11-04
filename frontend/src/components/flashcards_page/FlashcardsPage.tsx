import { useEffect, useState } from "react";
import EditableFlashcard from "./editable_flashcard/EditableFlashcard";
import "./FlashcardsPage.scss";
import flashcardService, { Flashcard } from "../../services/FlashcardService";
import topicService, { Topic } from "../../services/TopicService";

function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  // A hashmap cache of flashcard topic id : topic name.
  const topicNamesCache: Map<string, string> = new Map();

  useEffect(() => {
    // Call backend api to get the user's flashcards.
    flashcardService.getUserFlashcards("123").then((data) => {
      setFlashcards(data);
      cacheTopicNames();
      // TODO: make the comopnent renreder when setting topic names.
      // Thats why topics are displaying
    });
  }, []);

  // Instead of making a network request for every card to get their topic's
  // name, we'll cache one's we've already gotten here to prevent redundant
  // network requests.
  async function cacheTopicNames(): Promise<void> {
    for (const flashcard of flashcards) {
      if (
        // if the flashcard has a topic and it's topic is not cached
        flashcard.topicId != null &&
        !topicNamesCache.has(flashcard.topicId)
      ) {
        // Make the request for the topic.
        const topic: Topic | null = await topicService.getTopic(
          flashcard.topicId
        );
        // If the topic is not null, cache it's name.
        if (topic != null) {
          topicNamesCache.set(flashcard.topicId, topic.name);
        }
      }
    }
  }

  return (
    <div className="FlashcardsPage">
      <h1 className="flashcards-page-heading font-bold text-2xl">
        Your Flashcards
      </h1>
      <div className="content-container">
        <div className="flashcards-display">
          {flashcards.map((flashcard) => (
            <EditableFlashcard
              id={flashcard.id}
              answer={flashcard.answer}
              question={flashcard.question}
              topicId={flashcard.topicId}
              // prettier-ignore
              topicName={flashcard.topicId ? topicNamesCache.get(flashcard.topicId) : null}
              key={flashcard.id}
            />
          ))}
        </div>
        {/* add new task button */}
        <button className="add-task-button icon-button icon-button-green">
          <span className="material-symbols-rounded text-3xl">add</span>
        </button>
      </div>
    </div>
  );
}

export default FlashcardsPage;
