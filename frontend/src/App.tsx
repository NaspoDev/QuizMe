import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">main content</div>
    </div>
  );
}

export default App;
