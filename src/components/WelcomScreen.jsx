import React, { useState } from "react";
import { uniqueTags as tags } from "../data/tags";
function WelcomScreen() {
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  console.log(selectedTags);
  const handleBegin = () => {
    if (!name) alert("Name Required");
    if (selectedTags.length < 10) alert("Add at Least 10 Tags");
    if (selectedTags.length > 20) alert("You can add only up to  20 Tags");

    console.log(name);
  };
  const handleTag = (tag) => {
    setSelectedTags((pT) => [...pT, tag]);
  };

  return (
    <div>
      <h1>Hi ! Welcome To Quiz App</h1>

      <div>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={"Write Your name"}
        />
        <button onClick={handleBegin}>Begin</button>
      </div>

      <div>
        <h2>Select Multiple Tag in Order To Begin THe Quiz. (Required 10) </h2>
        <div>
          {tags &&
            tags.map((tag, i) => {
              return (
                <span key={i} onClick={() => handleTag(tag)}>
                  {tag}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default WelcomScreen;
