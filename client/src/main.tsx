import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthStatusProvider from "./providers/AuthStatusProvider";

const googleClientId: string =
  "300365749623-7ri9a9627vjc92m9371hanaqf63t8sa6.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <AuthStatusProvider>
    {/* A context provider from the `react-oauth/google` package that makes sure
    the app has the necessary credentials (like client id) throughout the app. */}
    <GoogleOAuthProvider clientId={googleClientId}>
      <StrictMode>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </StrictMode>
    </GoogleOAuthProvider>
  </AuthStatusProvider>
);
