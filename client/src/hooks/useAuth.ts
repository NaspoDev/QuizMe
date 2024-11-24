// Custom useAuth hook.
// Deals with authorization logic and keeps track of the logged in user.

import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AuthStateContext } from "../providers/AuthStateProvider";

export default function useAuth() {
  const [user, setUser] = useContext(AuthStateContext);
  // Loading state for when logging in. (Cannot await since useGoogleLogin
  // doesn't return a promise).
  let loading: boolean = false;

  // Google sign in logic.
  const googleSignIn = useGoogleLogin({
    onSuccess: handleGoogleSignInSuccess,
    onError: handleGoogleSignInFailure,
  });

  async function handleGoogleSignIn(): Promise<void> {
    loading = true;
    googleSignIn();
    // Repeatedly check for loading to be false.
    while (loading) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

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
    } catch (error) {
      console.log(
        "Failed to fetch user info from Google api during google sign in."
      );
      console.log(error);
    } finally {
      console.log("loading is false!");
      loading = false;
    }
  }

  function handleGoogleSignInFailure(): void {
    loading = false;
    console.log("Sign in failed!");
  }

  async function handleGuestSignIn(): Promise<void> {
    setUser("guest");
  }

  return { handleGoogleSignIn, handleGuestSignIn, user };
}
