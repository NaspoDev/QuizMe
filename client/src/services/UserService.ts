// User service. Handles all server related user operations.

import { NonGuestUser } from "../utility/user-utility";
import apiUrl from "../api";

class UserService {
  readonly usersRoute: string = `${apiUrl}/users`;

  // Tries to create a new user with the user provided if they don't exist.
  async createUserIfDoesNotExist(user: NonGuestUser): Promise<void> {
    try {
      // First check if the user already exists.
      const userResponse = await fetch(`${this.usersRoute}/${user.userId}`);
      const userResData = await userResponse.json();
      // If the user already exist, exit;
      if (userResData.length != 0) {
        return;
      }
    } catch (error) {
      console.error("Checking user's existence:", error);
    }

    // Otherwise the user doesn't exist, so create them.
    try {
      await fetch(`${this.usersRoute}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.userId,
          authProvider: user.userType,
        }),
      });
    } catch (error) {
      console.error("Error creating new user.", error);
    }
  }
}

const userService: UserService = new UserService();
export default userService;
