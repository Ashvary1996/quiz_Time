import React, { useEffect, useState } from "react";
import { questions } from "../data/question";
import { useLocation } from "react-router-dom";

function TestScreen() {
  const location = useLocation();
  const { name, selectedTags } = location.state;
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [timer, setTimer] = useState(2);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showFullResult, setShowFullResult] = useState(false);
  console.log(filteredQuestions);

  useEffect(() => {
    const filteredQ = questions
      .filter((question) =>
        question.tags.some((tag) => selectedTags.includes(tag))
      )
      .slice(0, 10);
    setFilteredQuestions(filteredQ);
  }, [selectedTags]);

  useEffect(() => {
    if (timer === 0) {
      if (currentQuestionIndex < filteredQuestions.length - 1) {
        handleNextQuestion();
      }
    } else {
      const countdown = setTimeout(
        () => setTimer((prevTime) => prevTime - 1),
        1000
      );
      return () => {
        clearTimeout(countdown);
      };
    }
  }, [timer, currentQuestionIndex, filteredQuestions.length]);

  let currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    if (currentQuestion.type == "single") {
      setSelectedOptions([option]);
    } else
      setSelectedOptions((prevOptions) =>
        prevOptions.includes(option)
          ? prevOptions.filter((o) => o !== option)
          : [...prevOptions, option]
      );
  };

  const calculateScore = () => {
    let questionScore = 0;
    if (currentQuestion.type === "single") {
      if (selectedOptions[0] === currentQuestion.correct[0]) {
        questionScore = 4;
      } else {
        questionScore = -2;
      }
    } else {
      const correctOptions = currentQuestion.correct;
      selectedOptions.forEach((option) => {
        if (correctOptions.includes(option)) {
          questionScore += 1;
        } else {
          questionScore -= 1;
        }
      });
      if (selectedOptions.length === correctOptions.length) {
        questionScore = 4;
      }
    }
    return questionScore;
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    const questionScore = calculateScore();
    setScore((prevScore) => prevScore + questionScore);
    setSelectedOptions([]);
    setTimer(2);
  };
  if (currentQuestionIndex + 1 == 10 && timer == 0) {
    currentQuestion = "";
  }
  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Test for {name}</h2>
      {currentQuestion ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
          <div className="flex justify-between mb-4">
            <p className="text-lg font-semibold">Time Left: {timer} seconds</p>
            <p className="text-lg font-semibold">
              Question {currentQuestionIndex + 1}/{filteredQuestions.length}
            </p>
          </div>
          <p className="text-xl font-medium mb-4">{currentQuestion.question}</p>
          <p className="mb-4">
            <span className="font-semibold">Type:</span>{" "}
            {currentQuestion.type === "single"
              ? "Single Answer"
              : "Multiple Answers"}
          </p>
          <ul className="list-disc list-inside space-y-2">
            {currentQuestion.options.map((option, i) => (
              <li
                key={i}
                className={`text-lg cursor-pointer p-2 rounded ${
                  selectedOptions.includes(option)
                    ? "bg-blue-200"
                    : "bg-gray-100"
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-lg font-medium mt-4">
          <p>Your final score is: {score}</p>
          <button
            onClick={() => setShowFullResult(!showFullResult)}
            className="mt-4 bg-teal-500 text-white p-2 rounded"
          >
            {showFullResult ? "Hide Full Result" : "Show Full Result"}
          </button>
          {showFullResult && (
            <div className="mt-4">
              {filteredQuestions.map((question, index) => (
                <div key={index} className="mb-4 p-2 border-b border-gray-200">
                  <h3 className="font-semibold">
                    {index + 1}. {question.question}
                  </h3>
                  <p>
                    <span className="font-semibold">Correct Answer:</span>{" "}
                    {question.correct.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold">Your Answer:</span>{" "}
                    {selectedAnswers[index]?.join(", ") || "No answer selected"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TestScreen;
