import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  selectedTags: [],
  filteredQuestions: [],
  score: 0,
  currentQuestionIndex: 0,
  selectedOptions: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setFilteredQuestions: (state, action) => {
      state.filteredQuestions = action.payload;
    },
    setScore: (state, action) => {
      state.score += action.payload;
    },
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    setSelectedOptions: (state, action) => {
      state.selectedOptions = action.payload;
    },
  },
});

export const {
  setName,
  setSelectedTags,
  setScore,
  setCurrentQuestionIndex,
  setSelectedOptions,
  setFilteredQuestions,
} = quizSlice.actions;

export default quizSlice.reducer;
