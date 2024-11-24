// Custom useAuth hook.
// Deals with authorization logic and keeps track of the logged in user.

import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AuthStateContext } from "../providers/AuthStateProvider";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [user, setUser] = useContext(AuthStateContext);
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

  async function handleGuestSignIn(): Promise<void> {
    setUser("guest");
    navigateAfterSignIn();
  }

  // To be called after sign in processes have been completed.
  // Navigates to the correct page after sign in.
  function navigateAfterSignIn(): void {
    navigate("/topics");
  }

  return { googleSignIn, handleGuestSignIn, user };
}
