// Custom useAuth hook.
// Deals with authorization logic and keeps track of the logged in user.

import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {
  clearUser,
  GoogleUser,
  GuestUser,
  setUser,
} from "../utility/user-utility";
import { useContext } from "react";
import { AuthStatusContext } from "../providers/AuthStatusProvider";
import userService from "../services/UserService";

export default function useAuth() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isSignedIn, setSignedIn] = useContext(AuthStatusContext);

  // Google sign in logic.
  const googleSignIn = useGoogleLogin({
    onSuccess: handleGoogleSignInSuccess,
    onError: handleGoogleSignInFailure,
  });

  async function handleGoogleSignInSuccess(
    tokenResponse: TokenResponse
  ): Promise<void> {
    // Get the user info from Google's api.
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const data = await response.json();

      // Create the google user's user id.
      // The user id should be created with the auth provider's (google's) user id
      // for the user, prefixed by the auth provider's name and a dash.
      // `sub` is google's unique user id.
      const userId: string = `google-${data.sub}`;

      // Create the GoogleUser object.
      const user: GoogleUser = {
        userType: "google",
        userId: userId,
        firstName: data.given_name,
      };

      // Create the user on the backend if they don't already exist (i.e. new user).
      await userService.createUserIfDoesNotExist(user);
      setUser(user); // Set the user in session storage
      setSignedIn(true); // Update the AuthStatusContext

      navigateAfterSignIn();
    } catch (error) {
      console.log(
        "Failed to fetch user info from Google api during google sign in or failed to create user on the backend."
      );
      console.log(error);
    }
  }

  function handleGoogleSignInFailure(): void {
    console.log("Sign in failed!");
  }

  function handleGuestSignIn(): void {
    const user: GuestUser = {
      userType: "guest",
    };
    setUser(user); // Set the user in session storage
    setSignedIn(true); // Update the AuthStatusContext
    navigateAfterSignIn();
  }

  // To be called after sign in processes have been completed.
  // Navigates to the correct page after sign in.
  function navigateAfterSignIn(): void {
    navigate("/topics");
  }

  // Signs out the current user by removing them from session storage
  // and by setting isSignedIn from AuthStatusContext to false.
  function userSignOut(): void {
    clearUser();
    setSignedIn(false);
  }

  return { googleSignIn, handleGuestSignIn, userSignOut };
}
