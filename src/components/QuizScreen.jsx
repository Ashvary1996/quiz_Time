import React, { useEffect, useState } from "react";
import { questions } from "../data/question";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestionIndex,
  setFilteredQuestions,
  setScore,
  setSelectedOptions,
} from "../redux/quizeSlice";

function QuizScreen() {
  const [timer, setTimer] = useState(30);
  const [showFullResult, setShowFullResult] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const dispatch = useDispatch();
  const {
    name,
    selectedTags,
    filteredQuestions,
    currentQuestionIndex,
    selectedOptions,
    score,
  } = useSelector((state) => state.quiz);

  useEffect(() => {
    const filteredQ = questions
      .filter((question) =>
        question.tags.some((tag) => selectedTags.includes(tag))
      )
      .slice(0, 10);
    dispatch(setFilteredQuestions(filteredQ));
  }, [dispatch, selectedTags]);

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
    if (currentQuestion.type === "single") {
      dispatch(setSelectedOptions([option]));
    } else {
      const newOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option];
      dispatch(setSelectedOptions(newOptions));
    }
  };

  const calculateScore = () => {
    let questionScore = 0;
    if (currentQuestion.type === "single") {
      if (selectedOptions.length === 0) {
        questionScore = 0;
      } else if (selectedOptions[0] === currentQuestion.correct[0]) {
        questionScore = 4;
      } else {
        questionScore = -2;
      }
    } else {
      const correctOptions = currentQuestion.correct;

      const correctCount = selectedOptions.filter((option) =>
        correctOptions.includes(option)
      ).length;
      const incorrectCount = selectedOptions.length - correctCount;

      const allCorrectSelected = correctOptions.every((option) =>
        selectedOptions.includes(option)
      );
      const noIncorrectOptions =
        correctOptions.length === selectedOptions.length;

      if (noIncorrectOptions && allCorrectSelected) {
        questionScore = 4;
      } else {
        questionScore = correctCount - incorrectCount;
      }
    }

    return questionScore;
  };

  const handleNextQuestion = () => {
    setSelectedAnswers((prev) => [...prev, selectedOptions]);
    const questionScore = calculateScore();
    dispatch(setScore(questionScore));
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
      dispatch(setSelectedOptions([]));
      setTimer(30);
    } 
    if (currentQuestionIndex + 1 === 10 && timer === 0) {
      currentQuestion = "";
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-2 text-right mr-2">
        Test for {name}
      </h2>
      <div className="p-2 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        {currentQuestion && timer > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
            <div className="flex justify-between mb-4">
              <p className="text-lg font-semibold">
                Time Left: {timer} seconds
              </p>
              <p className="text-lg font-semibold">
                Question {currentQuestionIndex + 1}/{filteredQuestions.length}
              </p>
            </div>
            <p className="text-xl font-medium mb-4">
              {currentQuestion.question}
            </p>
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
                      ? "bg-amber-300 "
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
            <button
              onClick={handleNextQuestion}
              className="mt-4 bg-teal-500 text-white p-2 rounded"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="text-lg font-medium mt-4">
            <h1 className="text-3xl font-semibold mb-2">TEST ENDED</h1>
            <p>
              Your final score is: <span className="text-2xl">{score}</span>
            </p>
            <button
              onClick={() => setShowFullResult(!showFullResult)}
              className="mt-4 bg-teal-500 text-white p-2 rounded"
            >
              {showFullResult ? "Hide Full Result" : "Show Full Result"}
            </button>
            {showFullResult && (
              <div className="mt-4">
                {filteredQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="mb-4 p-2 border-b border-gray-200"
                  >
                    <h3 className="font-semibold">
                      {index + 1}. {question.question}
                    </h3>
                    <p>
                      <span className="font-semibold">Correct Answer:</span>{" "}
                      {question.correct.join(", ")}
                    </p>
                    <p>
                      <span className="font-semibold">Your Answer:</span>{" "}
                      {selectedAnswers[index]?.join(", ") ||
                        "No answer selected"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default QuizScreen;
