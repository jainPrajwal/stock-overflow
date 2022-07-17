import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionsState, ServerError } from "../../constants";
import { loadQuestions } from "../../services";
import { addQuestionService } from "../../services/question/addQuestionService";
import { updateQuestionService } from "../../services/question/updateQuestionService";

const initialState: QuestionsState = {
  questions: [],
  loadingStatus: `idle`,
  error: null,
  sortBy: null,
  filterBy: null,
  message: null,
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
      if (`questions` in action.payload) {
        state.questions = action.payload.questions;
        state.loadingStatus = `success`;
      }
    });
    builder.addCase(loadQuestions.pending, (state) => {
      state.loadingStatus = `loading`;
    });
    builder.addCase(loadQuestions.rejected, (state, action) => {
      console.log(`falied `, action.payload);
      console.log(`failed... `, action.error);
      state.loadingStatus = `error`;
      state.message =
        (action.payload as ServerError)?.message ||
        `Network Issue.. Please try again!`;
      state.error = action.error;
    });

    builder.addCase(addQuestionService.fulfilled, (state, action) => {
      console.log(`question added `, action.payload);
      if (`question` in action.payload) {
        state.questions.push(action.payload.question);
        state.loadingStatus = `success`;
        state.message = action.payload.message;
      }
    });

    builder.addCase(addQuestionService.pending, (state, action) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(addQuestionService.rejected, (state, action) => {
      console.log(`action payload `, action.payload);
      state.message = (action.payload as ServerError).message;
      state.loadingStatus = `error`;
      state.error = action.error;
    });

    builder.addCase(updateQuestionService.fulfilled, (state, action) => {
      const questionIndex = state.questions.findIndex(
        (question) => question._id === action.payload.question._id
      );
      state.questions[questionIndex] = action.payload.question;
      state.loadingStatus = `success`;
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
