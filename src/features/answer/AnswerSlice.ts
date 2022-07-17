import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { AnswersState, BASE_API } from "../../constants";

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
  },
});

export default AnswerSlice.reducer;
// https://stock-overfloww.herokuapp.com/questions/62c6e5552537c86436097c72/answers
// https://stock-overfloww.herokuapp.com/questions/62c6787fb784c6f4de524eb5/answers
