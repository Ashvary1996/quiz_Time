import React, { useState } from "react";
import { uniqueTags as tags } from "../data/tags";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function WelcomScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  // console.log(name);
  // console.log(selectedTags);

  const handleBegin = () => {
    if (!name) toast.error("Name is required");
    else if (selectedTags.length < 10) toast.error("Add at least 10 tags");
    else if (selectedTags.length > 20)
      toast.error("You can add only up to 20 tags");
    else
      navigate("beginQuiz", {
        state: {
          name,
          selectedTags,
        },
      });
  };

  const handleTag = (tag) => {
    if (selectedTags.length >= 20) toast.warn("You can add only up to 20 tags");
    else if (selectedTags.includes(tag)) {
      toast.info(`${tag} already added`);
    } else {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleSelectedTag = (tag) => {
    const updatedTags = selectedTags.filter((elem) => elem !== tag);
    setSelectedTags(updatedTags);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <ToastContainer />

      <h1 className="text-3xl font-bold mb-6 text-center">
        Hi! Welcome To Quiz App
      </h1>

      <div className="mb-6 w-full max-w-sm">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 border rounded shadow-sm "
        />
        <button
          onClick={handleBegin}
          className="mt-4 w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition"
        >
          Enter
        </button>
      </div>

      <div className="w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Select Multiple Tags to start the Quiz.
        </h2>

        {selectedTags.length > 0 ? (
          <fieldset className="mb-4 border-2 border-teal-500 p-4   rounded">
            <legend className="text-left text-lg font-medium">
              Selected Tags: {selectedTags.length}
            </legend>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag, i) => (
                <div key={i} className="flex items-center">
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600">
                    {tag}
                  </span>
                  <button
                    className="ml-2 text-red-500 hover:text-red-600 transition"
                    onClick={() => handleSelectedTag(tag)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </fieldset>
        ) : null}

        <div className="flex flex-wrap gap-2 border-2 p-2">
          {tags.map((tag, i) => (
            <button
              key={i}
              disabled={selectedTags.includes(tag)}
              onClick={() => handleTag(tag)}
              className={`px-3 py-1 rounded-full transition ${
                selectedTags.includes(tag)
                  ? "cursor-not-allowed opacity-50 bg-gray-300"
                  : "cursor-pointer bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WelcomScreen;
