import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AnswerResponseType, AnswersState, BASE_API, ServerError } from "../../constants";
import { addAnswerService, updateAnswerService } from "../../services";

const initialState: AnswersState = {
  answers: [],
  loadingStatus: `idle`,
  sortBy: null,
  filterBy: null,
  error: null,
  message: null,
};
export const loadAnswersOfTheQuestion = createAsyncThunk(
  `answers/loadAnswersOfTheQuestion`,
  async ({ questionId }: { questionId: string }) => {
    const response = await axios.get(
      `${BASE_API}/questions/${questionId}/answers`
    );

    return response.data;
  }
);
const AnswerSlice = createSlice({
  name: `answer`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAnswersOfTheQuestion.fulfilled, (state, action) => {
      
      state.answers = action.payload.answers;
      
    });

    builder.addCase(loadAnswersOfTheQuestion.pending, (state) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(loadAnswersOfTheQuestion.rejected, (state, action) => {
      state.loadingStatus = `error`;
      state.error = action.error;
      state.message = (action.payload as ServerError).message;
    });

    builder.addCase(updateAnswerService.fulfilled, (state, action) => {
      if (`answer` in action.payload) {
        const answerIndex = state.answers.findIndex(
          (answer) => answer._id === action.payload.answer._id
        );
        state.answers[answerIndex] = action.payload.answer;
        state.message = action.payload.message;
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

    builder.addCase(addAnswerService.fulfilled, (state, action: PayloadAction<AnswerResponseType>) => {
      if (`answer` in action.payload) {
        state.answers.push(action.payload.answer);
      }
    });
  },
});

export default AnswerSlice.reducer;
