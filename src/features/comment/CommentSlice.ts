import { createSlice, current } from "@reduxjs/toolkit";
import { Comment, CommentsState, ServerError } from "../../constants";
import {
  deleteCommentonAnswerService,
  deleteCommentOnQuestionService,
} from "../../services";
import { addCommentsOnAnswerService } from "../../services/comment/addCommentsOnAnswerService";
import { addCommentsOnQuestionService } from "../../services/comment/addCommentsOnQuestionService";
import { getCommentsOnAnswerService } from "../../services/comment/getCommentsOnAnswerService";
import { getCommentsOnQuestionService } from "../../services/comment/getCommentsOnQuestionService";
import { updateCommentonAnswerService } from "../../services/comment/updateCommentOnAnswerService";
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
    // Question

    // getCommentsOnQuestionService
    builder.addCase(getCommentsOnQuestionService.fulfilled, (state, action) => {
      if (`comments` in action.payload) {
        state.comments.questionsMeta.questions = action.payload.comments;
        state.comments.questionsMeta.loadingStatus = `success`;
        state.comments.questionsMeta.message = action.payload.message;
      }
    });

    builder.addCase(getCommentsOnQuestionService.pending, (state) => {
      state.comments.questionsMeta.loadingStatus = `loading`;
    });

    builder.addCase(getCommentsOnQuestionService.rejected, (state, action) => {
      state.comments.questionsMeta.loadingStatus = `error`;
      state.comments.questionsMeta.message = (
        action.payload as ServerError
      )?.message;
    });

    // addCommentsOnQuestionService
    builder.addCase(addCommentsOnQuestionService.fulfilled, (state, action) => {
      if (`comment` in action.payload) {
        state.comments.questionsMeta.questions.push(action.payload.comment);
        state.comments.questionsMeta.loadingStatus = `success`;
        state.comments.questionsMeta.message = action.payload.message;
      }
    });

    builder.addCase(addCommentsOnQuestionService.pending, (state) => {
      state.comments.questionsMeta.loadingStatus = `loading`;
    });

    builder.addCase(addCommentsOnQuestionService.rejected, (state, action) => {
      state.comments.questionsMeta.loadingStatus = `error`;
      state.comments.questionsMeta.message = (
        action.payload as ServerError
      )?.message;
    });

    // updateCommentonQuestionService
    builder.addCase(
      updateCommentonQuestionService.fulfilled,
      (state, action) => {
        if (`comment` in action.payload) {
          const commentIndex = state.comments.questionsMeta.questions.findIndex(
            (comment) => comment._id === action.payload.comment._id
          );

          state.comments.questionsMeta.questions[commentIndex] =
            action.payload.comment;
          state.comments.questionsMeta.loadingStatus = `success`;
          state.comments.questionsMeta.message = action.payload.message;
        }
      }
    );

    builder.addCase(updateCommentonQuestionService.pending, (state) => {
      state.comments.questionsMeta.loadingStatus = `loading`;
    });

    builder.addCase(
      updateCommentonQuestionService.rejected,
      (state, action) => {
        state.comments.questionsMeta.loadingStatus = `error`;
        state.comments.questionsMeta.message = (
          action.payload as ServerError
        )?.message;
      }
    );

    // getCommentsOnAnswerService
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

        state.comments.answersMeta.loadingStatus = `success`;
        state.comments.answersMeta.message = action.payload.message;
      }
    });

    builder.addCase(getCommentsOnAnswerService.pending, (state) => {
      state.comments.answersMeta.loadingStatus = `loading`;
    });

    builder.addCase(getCommentsOnAnswerService.rejected, (state, action) => {
      state.comments.answersMeta.loadingStatus = `error`;
      state.comments.answersMeta.message = (
        action.payload as ServerError
      )?.message;
    });

    // addCommentsOnAnswerService
    builder.addCase(addCommentsOnAnswerService.fulfilled, (state, action) => {
      if (`comment` in action.payload) {
        state.comments.answersMeta.answers.push(action.payload.comment);
        state.comments.answersMeta.loadingStatus = `success`;
        state.comments.answersMeta.message = action.payload.message;
      }
    });

    builder.addCase(addCommentsOnAnswerService.pending, (state) => {
      state.comments.answersMeta.loadingStatus = `loading`;
    });

    builder.addCase(addCommentsOnAnswerService.rejected, (state, action) => {
      state.comments.answersMeta.loadingStatus = `error`;
      state.comments.answersMeta.message = (
        action.payload as ServerError
      )?.message;
    });

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

    builder.addCase(deleteCommentOnQuestionService.pending, (state) => {
      state.comments.questionsMeta.loadingStatus = `loading`;
    });

    builder.addCase(
      deleteCommentOnQuestionService.rejected,
      (state, action) => {
        state.comments.questionsMeta.loadingStatus = `error`;
        state.comments.questionsMeta.message = (
          action.payload as ServerError
        )?.message;
      }
    );

    // updateCommentonAnswerService
    builder.addCase(updateCommentonAnswerService.fulfilled, (state, action) => {
      if (`comment` in action.payload) {
        const commentIndex = state.comments.answersMeta.answers.findIndex(
          (comment) => comment._id === action.payload.comment._id
        );

        state.comments.answersMeta.answers[commentIndex] =
          action.payload.comment;
        state.comments.answersMeta.loadingStatus = `success`;
        state.comments.answersMeta.message = action.payload.message;
      }
    });
    builder.addCase(updateCommentonAnswerService.pending, (state) => {
      state.comments.answersMeta.loadingStatus = `loading`;
    });

    builder.addCase(updateCommentonAnswerService.rejected, (state, action) => {
      state.comments.answersMeta.loadingStatus = `error`;
      state.comments.answersMeta.message = (
        action.payload as ServerError
      )?.message;
    });

    // deleteCommentonAnswerService
    builder.addCase(deleteCommentonAnswerService.fulfilled, (state, action) => {
      if (`comment` in action.payload) {
        const commentIndex = state.comments.answersMeta.answers.findIndex(
          (commentOnAnswer) =>
            commentOnAnswer._id === action.payload.comment._id
        );
        state.comments.answersMeta.answers[commentIndex] =
          action.payload.comment;

        state.comments.answersMeta.loadingStatus = `success`;
        state.comments.answersMeta.message = action.payload.message;
      }
    });

    builder.addCase(deleteCommentonAnswerService.pending, (state) => {
      state.comments.answersMeta.loadingStatus = `loading`;
    });

    builder.addCase(deleteCommentonAnswerService.rejected, (state, action) => {
      state.comments.answersMeta.loadingStatus = `error`;
      state.comments.answersMeta.message = (
        action.payload as ServerError
      )?.message;
    });
  },
});

export default commentSlice.reducer;
