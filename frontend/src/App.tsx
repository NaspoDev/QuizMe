import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import LandingPage from "./components/landing_page/LandingPage";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        {location.pathname == "/" && <LandingPage />}
      </div>
    </div>
  );
}

export default App;
