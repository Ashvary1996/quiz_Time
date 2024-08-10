import React from "react";
import { useNavigate } from "react-router-dom";

function StartQuiz() {
  const navigate = useNavigate();

  const handelClick = () => {
    navigate("/testScreen");
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
        Read Carefully
      </h2>
      <p className="text-center text-gray-700 mb-8">
        Each question has a 30-second timer
      </p>

      <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow-md">
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">Scoring</h3>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          <li>Each question carries 4 marks.</li>
        </h3>
        <li className="text-xl font-semibold text-gray-800 mb-4">
          For single-answer questions:
        </li>
        <ul className="text-gray-700 mb-4 space-y-2">
          <li>+4 marks for a correct answer.</li>
          <li>-2 marks for a wrong answer.</li>
        </ul>
        <li className="text-xl font-semibold text-gray-800 mb-4">
          For multiple-answer questions:
        </li>
        <ul className="text-gray-700 space-y-2">
          <li>+4 marks if all selected options are correct.</li>
          <li>+1 mark for each correct option selected.</li>
          <li>-1 mark for each incorrect option selected.</li>
        </ul>
      </div>

      <button
        onClick={handelClick}
        className="bg-green-500 text white text-white p-2 "
      >
        BEGIN TEST
      </button>
    </div>
  );
}

export default StartQuiz;
