import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  AnswerResponseType,
  AnswersState,
  BASE_API,
  ServerError,
} from "../../constants";
import { addAnswerService, updateAnswerService } from "../../services";
import { deleteAnswerService } from "../../services/answer/deleteAnswerService";
import { loadAnswersOfTheQuestionService } from "../../services/answer/loadAnswersOftheQuestionService";

const initialState: AnswersState = {
  answers: [],
  loadingStatus: `idle`,
  sortBy: null,
  filterBy: null,
  error: null,
  message: null,
};

const AnswerSlice = createSlice({
  name: `answer`,
  initialState,
  reducers: {
    sortyByDrowpdownClicked: (
      state,
      action: PayloadAction<{ sortBy: string }>
    ) => {
      state.sortBy = action.payload.sortBy;
    },
  },

  extraReducers: (builder) => {
    // loadAnswersOfTheQuestionService
    builder.addCase(
      loadAnswersOfTheQuestionService.fulfilled,
      (state, action) => {
        state.answers = action.payload.answers;
        state.loadingStatus = `success`;
      }
    );

    builder.addCase(loadAnswersOfTheQuestionService.pending, (state) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(
      loadAnswersOfTheQuestionService.rejected,
      (state, action) => {
        state.loadingStatus = `error`;
        state.error = action.error;
        state.message = (action.payload as ServerError).message;
      }
    );

    // updateAnswerService
    builder.addCase(updateAnswerService.fulfilled, (state, action) => {
      if (`answer` in action.payload) {
        const answerIndex = state.answers.findIndex(
          (answer) => answer._id === action.payload.answer._id
        );
        state.answers[answerIndex] = action.payload.answer;
        state.message = action.payload.message;
        state.loadingStatus = `success`;
      }
    });

    builder.addCase(updateAnswerService.pending, (state) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(updateAnswerService.rejected, (state, action) => {
      state.loadingStatus = `error`;
      state.error = action.error;
      state.message = (action.payload as ServerError).message;
    });

    // addAnswerService
    builder.addCase(addAnswerService.fulfilled, (state, action) => {
      if (`answer` in action.payload) {
        state.answers.push(action.payload.answer);
        state.answers = state.answers.reverse();
        state.loadingStatus = `success`;
        state.message = action.payload.message;
      }
    });

    builder.addCase(addAnswerService.pending, (state) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(addAnswerService.rejected, (state, action) => {
      state.loadingStatus = `error`;
      state.error = action.error;
      state.message = (action.payload as ServerError).message;
    });

    builder.addCase(deleteAnswerService.fulfilled, (state, action) => {
      if (`answer` in action.payload) {
        const answerIndex = state.answers.findIndex(
          (answer) => answer._id === action.payload.answer._id
        );
        state.answers[answerIndex] = action.payload.answer;
        state.message = action.payload.message;
        state.loadingStatus = `success`;
      }
    });

    builder.addCase(deleteAnswerService.pending, (state) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(deleteAnswerService.rejected, (state, action) => {
      state.loadingStatus = `error`;
      state.error = action.error;
      state.message = (action.payload as ServerError).message;
    });
  },
});

export const { sortyByDrowpdownClicked } = AnswerSlice.actions;
export default AnswerSlice.reducer;
