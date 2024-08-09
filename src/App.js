import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import WelcomScreen from "./components/WelcomScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BeginQuiz from "./components/BeginQuiz";
import TestScreen from "./components/TestScreen";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomScreen />} />
          <Route path="/beginQuiz" element={<BeginQuiz />} />
          <Route path="/testScreen" element={<TestScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
