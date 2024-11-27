// Topic service. Handles all server related Topics operations.

import apiUrl from "../api";
import { getUser, User } from "../utility/user-utility";
import flashcardService, { Flashcard } from "./FlashcardService";

// The Topic interface, used to create Topics.
export interface Topic {
  id: string;
  name: string;
  numberOfFlashcards: number;
}

class TopicService {
  readonly topicsRoute: string = `${apiUrl}/topics`;

  async getUserTopics(): Promise<Topic[]> {
    const user: User = getUser();
    if (!user || user.userType == "guest") {
      throw new Error("Cannot get user topics for null or guest user!");
    }

    // Make the requests. First fetch topics, then for each topic fetch their
    // flashcards to fill the numberOfFlashcards property for each Topic object.
    try {
      // Fetch topics.
      const topicsResponse = await fetch(
        `${this.topicsRoute}/user-topics/${user.userId}`
      );
      if (!topicsResponse.ok) {
        throw new Error(`Failed to fetch topics: ${topicsResponse.statusText}`);
      }

      // Get the json topics response.
      const topicsResponseJson = await topicsResponse.json();

      // Parse the topics json response to an object.
      const topicsData: { id: string; name: string }[] = topicsResponseJson.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (topic: any) => {
          return {
            id: topic.topic_id,
            name: topic.name,
          };
        }
      );

      // `result` is our Topic list.
      // It will be constructed by requesting flashcards for each topicId in topicsData
      // and combining it with the topic data for that topic.
      const result: Topic[] = await Promise.all(
        topicsData.map(async (topicData) => {
          const flashcards: Flashcard[] =
            await flashcardService.getUserFlashcardsByTopic(topicData.id);

          const topic: Topic = {
            id: topicData.id,
            name: topicData.name,
            numberOfFlashcards: flashcards.length,
          };

          return topic;
        })
      );

      return result;
    } catch (error) {
      console.error("Error fetching user topics:", error);
      throw error;
    }
  }

  async getTopic(topicId: string): Promise<Topic> {
    try {
      // Fetch topic.
      const topicResponse = await fetch(`${this.topicsRoute}/${topicId}`);
      const topicResJson = await topicResponse.json();
      const topicData = topicResJson[0];

      // Fetch flashcards for the topic to get the number of flashcards.
      const flashcards: Flashcard[] =
        await flashcardService.getUserFlashcardsByTopic(topicData.topic_id);

      // Construct and return the topic object.
      const result: Topic = {
        id: topicData.topic_id,
        name: topicData.name,
        numberOfFlashcards: flashcards.length,
      };

      return result;
    } catch (error) {
      console.error("Error fetching user topic:", error);
      throw error;
    }
  }

  async createTopic(topic: Topic): Promise<void> {
    // Get the user id.
    const user: User = getUser();
    if (!user || user.userType == "guest") {
      throw new Error("Cannot get user topics for null or guest user!");
    }
    const userId: string = user.userId;

    try {
      await fetch(`${this.topicsRoute}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicId: topic.id,
          topicName: topic.name,
          userId: userId,
        }),
      });
    } catch (error) {
      console.error("Failed to create topic:", error);
    }
  }

  async updateTopic(topic: Topic): Promise<void> {
    return fetch(`${this.topicsRoute}/${topic.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName: topic.name,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error(`Failed to update topic: ${response.statusText}`);
        }
      })
      .catch((error) => console.error("Failed to update topic:", error));
  }

  // Deleting a topic also involves deleting all flashcards associated with that topic.
  async deleteTopic(topic: Topic): Promise<void> {
    fetch(`${this.topicsRoute}/${topic.id}`, {
      method: "DELETE",
    }).catch((error) => console.error("Failed to delete topic:", error));
  }
}

const topicService: TopicService = new TopicService();
export default topicService;
