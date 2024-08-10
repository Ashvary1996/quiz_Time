import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import WelcomScreen from "./components/WelcomScreen";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StartQuiz from "./components/StartQuiz";
import QuizScreen from "./components/QuizScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomScreen />} />
          <Route path="/beginQuiz" element={<StartQuiz />} />
          <Route path="/testScreen" element={<QuizScreen />} />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen flex-col">
                <h1 className="text-4xl font-bold mb-4">
                  404 : PAGE NOT FOUND
                </h1>
                <Link
                  to="/"
                  className="text-orange-800  text-2xl  font-bold hover:underline"
                >
                  Go Back
                </Link>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
