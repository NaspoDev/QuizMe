import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import googleIcon from "../../assets/images/google_icon.png";
import SidebarButton from "./sidebar_button/SidebarButton";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { AuthStateContext } from "../../providers/AuthStateProvider";

// Sidebar props.
// This component should be re-rendered whenever the location changes.
interface SidebarProps {
  pathname: string;
}

// Sidebar component. Always persistent, used to navigate and control the app.
function Sidebar({ pathname }: SidebarProps) {
  const navigate = useNavigate();
  const { googleSignIn, handleGuestSignIn } = useAuth();
  const [user] = useContext(AuthStateContext);

  return (
    <div className="Sidebar">
      <div className="heading">
        <h1 className="title font-bold text-2xl">QuizMe</h1>
        <h2 className="subtitle font-light text">A flashcard app.</h2>
        {/* TODO: Remove this temp h3 tag */}
        <h3>
          {!user
            ? "not signed in"
            : typeof user == "string"
            ? user
            : user.userId}
        </h3>
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
              onClick={async () => {
                await handleGuestSignIn();
                navigate("/topics");
              }}
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
