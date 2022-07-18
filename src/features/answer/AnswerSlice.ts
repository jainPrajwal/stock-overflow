import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { AnswersState, BASE_API } from "../../constants";
import { updateAnswerService } from "../../services";

const initialState: AnswersState = {
  answers: [],
  loadingStatus: `idle`,
  sortBy: null,
  filterBy: null,
  error: null,
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
      console.log(`action payload `, action.payload);
      state.answers = action.payload.answers;
      console.log(`loadAnswersfulfilled `, current(state));
    });

    builder.addCase(updateAnswerService.fulfilled, (state, action) => {
      if (`answer` in action.payload) {
        const answerIndex = state.answers.findIndex(
          (answer) => answer._id === action.payload.answer._id
        );
        state.answers[answerIndex] = action.payload.answer;
      }
    });
  },
});

export default AnswerSlice.reducer;

