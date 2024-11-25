// User utility module. Deals with managing the user in session storage.

export interface GoogleUser {
  userType: "google";
  userId: string; // Unique ID for Google users
  firstName: string;
}

export interface GuestUser {
  userType: "guest"; // Guest users have no ID
}

export type User = GoogleUser | GuestUser | null;

const userSessionStorageKey: string = "user";

export function getUser(): User {
  const result = sessionStorage.getItem(userSessionStorageKey);
  if (!result) {
    return null;
  } else {
    return JSON.parse(result);
  }
}

export function setUser(user: User): void {
  sessionStorage.setItem(userSessionStorageKey, JSON.stringify(user));
}

// Removes the `user` item from session storage. (Usually called on sign out).
export function clearUser(): void {
  sessionStorage.removeItem(userSessionStorageKey);
}
