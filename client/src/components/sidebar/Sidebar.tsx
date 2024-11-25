import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import googleIcon from "../../assets/images/google_icon.png";
import SidebarButton from "./sidebar_button/SidebarButton";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { AuthStatusContext } from "../../providers/AuthStatusProvider";
import { getUser, User } from "../../utility/user-utility";

// Sidebar props.
// This component should be re-rendered whenever the location changes.
interface SidebarProps {
  pathname: string;
}

// Sidebar component. Always persistent, used to navigate and control the app.
function Sidebar({ pathname }: SidebarProps) {
  const navigate = useNavigate();
  const { googleSignIn, handleGuestSignIn, userSignOut } = useAuth();
  const [isSignedIn] = useContext(AuthStatusContext);
  const user: User = getUser();

  return (
    <div className="Sidebar">
      <div className="heading">
        <h1 className="title font-bold text-2xl">QuizMe</h1>
        <h2 className="subtitle font-light text">A flashcard app.</h2>
      </div>

      {/* Buttons container. Buttons change based on current page. */}
      <div className="buttons">
        {/* Landing page */}
        {pathname == "/" && (
          <>
            {/* Sign in with Google button */}
            <SidebarButton
              text="Sign in With Google"
              onClick={googleSignIn}
              iconImage={googleIcon}
              additionalClasses="sidebar-button-green"
              additionalImageClasses="google-sign-in-button-image"
            />

            <SidebarButton
              text="Continue as Guest"
              onClick={handleGuestSignIn}
              additionalClasses="sidebar-button-gray"
            />
          </>
        )}

        {/* Topics page(s), start quiz page */}
        {(pathname.startsWith("/topics") || pathname == "/start-quiz") && (
          <>
            <SidebarButton
              text="My Topics"
              onClick={() => navigate("/topics")}
            />
            <SidebarButton
              text="Start a Quiz"
              onClick={() => navigate("/start-quiz")}
              additionalClasses="sidebar-button-green"
            />
          </>
        )}

        {/* Topics page(s), start quiz page */}
        {pathname.startsWith("/active-quiz") && (
          <SidebarButton
            text="End Quiz"
            onClick={() => navigate("/topics")}
            additionalClasses="sidebar-button-red"
          />
        )}
      </div>

      {isSignedIn && (
        // If they are signed in, display the logout container.
        <div className="logout-container">
          <p className="user-first-name font-light">
            Signed in as:{" "}
            {user?.userType == "guest" ? "Guest" : user?.firstName}
          </p>
          <SidebarButton
            text="Logout"
            onClick={userSignOut}
            additionalClasses="sidebar-button-gray"
          />
        </div>
      )}

      {/* Crediting myself */}
      <div className="developer-credits-container">
        <p className="developer-credits text-sm font-light">
          Created by{" "}
          <a
            href="https://naspo.dev/"
            target="_blank"
            className="naspo-hyperlink"
          >
            Naspo
          </a>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
