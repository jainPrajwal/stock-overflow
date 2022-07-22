import { createSlice, current } from "@reduxjs/toolkit";
import { Comment, CommentsState } from "../../constants";
import { deleteCommentOnQuestionService } from "../../services";
import { addCommentsOnAnswerService } from "../../services/comment/addCommentsOnAnswerService";
import { addCommentsOnQuestionService } from "../../services/comment/addCommentsOnQuestionService";
import { getCommentsOnAnswerService } from "../../services/comment/getCommentsOnAnswerService";
import { getCommentsOnQuestionService } from "../../services/comment/getCommentsOnQuestionService";
import { updateCommentonQuestionService } from "../../services/comment/updateCommentonQuestionService";

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
        state.comments.answersMeta.answers.push(
          ...action.payload.comments.map((comment) => comment)
        );
        const allComments = state.comments.answersMeta.answers.map(
          (comment) => [comment._id, comment] as [string, Comment]
        );
        const commentsMap = new Map(allComments);
        state.comments.answersMeta.answers = Array.from(commentsMap.values());

        console.log(`state `, current(state));

        state.comments.answersMeta.loadingStatus = `success`;
        state.comments.answersMeta.message = action.payload.message;
      }
    });

    builder.addCase(addCommentsOnQuestionService.fulfilled, (state, action) => {
      if (`comment` in action.payload) {
        state.comments.questionsMeta.questions.push(action.payload.comment);
        state.comments.questionsMeta.loadingStatus = `success`;
        state.comments.questionsMeta.message = action.payload.message;
      }
    });

    builder.addCase(addCommentsOnAnswerService.fulfilled, (state, action) => {
      if (`comment` in action.payload) {
        state.comments.answersMeta.answers.push(action.payload.comment);
        state.comments.answersMeta.loadingStatus = `success`;
        state.comments.answersMeta.message = action.payload.message;
      }
    });

    builder.addCase(
      updateCommentonQuestionService.fulfilled,
      (state, action) => {
        if (`comment` in action.payload) {
          const commentIndex = state.comments.questionsMeta.questions.findIndex(
            (comment) => comment._id === action.payload.comment._id
          );
          console.log(`index `, commentIndex);
          state.comments.questionsMeta.questions[commentIndex] =
            action.payload.comment;
          state.comments.questionsMeta.loadingStatus = `success`;
          state.comments.questionsMeta.message = action.payload.message;
          console.log(` STATTE `, current(state));
        }
      }
    );

    builder.addCase(
      deleteCommentOnQuestionService.fulfilled,
      (state, action) => {
        if (`comment` in action.payload) {
          const commentIndex = state.comments.questionsMeta.questions.findIndex(
            (commentOnQuestion) =>
              commentOnQuestion._id === action.payload.comment._id
          );
          state.comments.questionsMeta.questions[commentIndex] =
            action.payload.comment;

          state.comments.questionsMeta.loadingStatus = `success`;
          state.comments.questionsMeta.message = action.payload.message;
        }
      }
    );
  },
});

export default commentSlice.reducer;
