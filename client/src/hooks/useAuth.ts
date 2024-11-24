// Custom useAuth hook.
// Deals with authorization logic and keeps track of the logged in user.

import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { GoogleUser, GuestUser, setUser } from "../utility/user-utility";

export default function useAuth() {
  const navigate = useNavigate();

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

      console.log(data);
      // Create the GoogleUser object and save it to session storage.
      const user: GoogleUser = {
        userType: "google",
        userId: data.sub, // `sub` is google's unique user id.
        firstName: data.given_name,
      };
      setUser(user);

      navigateAfterSignIn();
    } catch (error) {
      console.log(
        "Failed to fetch user info from Google api during google sign in."
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
    setUser(user);
    navigateAfterSignIn();
  }

  // To be called after sign in processes have been completed.
  // Navigates to the correct page after sign in.
  function navigateAfterSignIn(): void {
    navigate("/topics");
  }

  return { googleSignIn, handleGuestSignIn };
}
