// Topic service. Handles all server related Topics operations.

import apiUrl from "../api";
import { getUser, User } from "../utility/user-utility";

// The Topic interface, used to create Topics.
export interface Topic {
  id: string;
  name: string;
  numberOfFlashcards: number;
}

// filler data
const topics: Topic[] = [
  { id: "1", name: "OOP", numberOfFlashcards: 10 },
  {
    id: "2",
    name: "Design Patterns",
    numberOfFlashcards: 8,
  },
  { id: "3", name: "System Design", numberOfFlashcards: 23 },
];

class TopicService {
  readonly topicsRoute: string = `${apiUrl}/topics`;

  async getUserTopics(): Promise<Topic[]> {
    const user: User = getUser();
    if (!user || user.userType == "guest") {
      throw new Error("Cannot get user topics for null or guest user!");
    }

    fetch(`${this.topicsRoute}/user-topics/${user.userId}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
    //TODO: parse data and return Topics[]
  }

  async getTopic(topicId: string): Promise<Topic> {
    // TODO: implementation
    for (const topic of topics) {
      if (topic.id == topicId) {
        return topic;
      }
    }

    throw new Error(
      `Could not find topic with topic id: ${topicId}. It's probably an invalid topic id.`
    );
  }

  async createTopic(topic: Topic): Promise<void> {
    // TODO: implementation
    console.log("New topic created on the server!");
    console.log(topic);
  }

  async updateTopic(topic: Topic): Promise<void> {
    // TODO: implementation
    console.log(topic);
  }

  // Deleting a topic also involves deleting all flashcards associated with that topic.
  async deleteTopic(topic: Topic): Promise<void> {
    // TODO: implementation
    console.log(topic);
  }
}

const topicService: TopicService = new TopicService();
export default topicService;
