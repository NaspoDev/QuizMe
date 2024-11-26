// User service. Handles all server related user operations.

import { NonGuestUser } from "../utility/user-utility";
import apiUrl from "../api";

class UserService {
  readonly usersRoute: string = `${apiUrl}/users`;

  // Tries to create a new user with the user provided if they don't exist.
  async createUserIfDoesNotExist(user: NonGuestUser): Promise<void> {
    fetch(`${this.usersRoute}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.userId,
        authProvider: user.userType,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to create user: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error("Failed to create new user: ", error);
      });
  }
}

const userService: UserService = new UserService();
export default userService;
