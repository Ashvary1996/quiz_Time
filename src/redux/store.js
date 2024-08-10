import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizeSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});
