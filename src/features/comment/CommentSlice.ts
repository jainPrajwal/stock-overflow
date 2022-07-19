import { createSlice } from "@reduxjs/toolkit";
import { CommentsState } from "../../constants";
import { getCommentsOnAnswerService } from "../../services/comment/getCommentsOnAnswerService";
import { getCommentsOnQuestionService } from "../../services/comment/getCommentsOnQuestionService";

const initialState: CommentsState = {
  comments: {
    questionsMeta: {
      questions: [],
      loadingStatus: `idle`,
      message: null,
      error: null,
    },
    answersMeta: {
      loadingStatus: `idle`,
      message: null,
      error: null,
      answers: [],
    },
  },
};

const commentSlice = createSlice({
  name: `comments`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentsOnQuestionService.fulfilled, (state, action) => {
      if (`comments` in action.payload) {
        state.comments.questionsMeta.questions = action.payload.comments;
        state.comments.questionsMeta.loadingStatus = `success`;
        state.comments.questionsMeta.message = action.payload.message;
      }
    });

    builder.addCase(getCommentsOnAnswerService.fulfilled, (state, action) => {
      if (`comments` in action.payload) {
        state.comments.answersMeta.answers = action.payload.comments;
        state.comments.answersMeta.loadingStatus = `success`;
        state.comments.answersMeta.message = action.payload.message;
      }
    });
  },
});

export default commentSlice.reducer;
