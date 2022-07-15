import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionsState, ServerError } from "../../constants";
import { loadQuestions } from "../../services";



const initialState: QuestionsState = {
  questions: [],
  loadingStatus: `idle`,
  error: null,
  sortBy: null,
  filterBy: null,
};

export const QuestionSlice = createSlice({
  name: `question`,
  initialState,
  reducers: {
    addQuestionButtonPressed: (state, action: PayloadAction<string>) => {
      return state;
    },
    saveToDraftsButtonPressed: (state, action: PayloadAction<string>) => {
      return state;
    },
    deleteQuestionButtonPressed: (state, action: PayloadAction<string>) => {
      return state;
    },
    updateQuestionButtonPressed: (state, action: PayloadAction<string>) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadQuestions.fulfilled, (state, action) => {
      state.questions = action.payload.questions;
      state.loadingStatus = `success`;
    });
    builder.addCase(loadQuestions.pending, (state) => {
      state.loadingStatus = `loading`;
    });
    builder.addCase(loadQuestions.rejected, (state, action) => {
      console.log(`falied `, action.payload);
      console.log(`failed... `, action.error);
      state.loadingStatus = `error`;
      state.error = (action.payload as ServerError).message;
    });
  },
});

export const {
  addQuestionButtonPressed,
  deleteQuestionButtonPressed,
  saveToDraftsButtonPressed,
  updateQuestionButtonPressed,
} = QuestionSlice.actions;

export default QuestionSlice.reducer;
