import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question, QuestionsState, ServerError } from "../../constants";
import {
  deleteQuestionService,
  getQuestionWithQuestionIdService,
  loadQuestions,
} from "../../services";
import { addQuestionService } from "../../services/question/addQuestionService";
import { updateQuestionService } from "../../services/question/updateQuestionService";
import { getQuestionFromQuestionId } from "../../utils/question";

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
    markAsCorrectAnswerClicked: (state, action: PayloadAction<Question>) => {
      const questionIndex = state.questions.findIndex(
        (question) => question._id === action.payload._id
      );
      state.questions[questionIndex].isAcceptedAnswerPresent = true;
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
      state.loadingStatus = `error`;
      state.message =
        (action.payload as ServerError)?.message ||
        `Network Issue.. Please try again!`;
      state.error = action.error;
    });

    builder.addCase(addQuestionService.fulfilled, (state, action) => {
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

    builder.addCase(
      getQuestionWithQuestionIdService.fulfilled,
      (state, action) => {
        if (`question` in action.payload) {
          state.questions.push(action.payload.question);
          state.message = action.payload.message;
          state.loadingStatus = `success`;
        }
      }
    );


    builder.addCase(deleteQuestionService.fulfilled, (state, action) => {
      const questionIndex = state.questions.findIndex(
        (question) => question._id === action.payload.question._id
      );
      state.questions[questionIndex] = action.payload.question;

      
    });

    builder.addCase(deleteQuestionService.pending, (state, action) => {
      state.loadingStatus = `loading`;
    });
  },
});

export const { markAsCorrectAnswerClicked } = QuestionSlice.actions;

export default QuestionSlice.reducer;
