import { createSlice, current } from "@reduxjs/toolkit";
import { ActivitiesState, ServerError } from "../../constants";
import { updateActivityAnswerService } from "../../services";
import { getActivitiesService } from "../../services/activity/getActivitiesService";
import { updateActivityQuestionService } from "../../services/activity/updateActivityQuestionService";
const initialState: ActivitiesState = {
  questions: {
    upvoted: [],
    downvoted: [],
    bookmarked: [],
  },
  answers: {
    upvoted: [],
    downvoted: [],
  },
  loadingStatus: `idle`,
  message: null,
  error: null,
};

const activitySlice = createSlice({
  name: `activity`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getActivitiesService
    builder.addCase(getActivitiesService.fulfilled, (state, action) => {
      if (`activity` in action.payload) {
        state.questions.upvoted = action.payload.activity.questions.upvoted;
        state.questions.downvoted = action.payload.activity.questions.downvoted;
        state.questions.bookmarked =
          action.payload.activity.questions.bookmarked;
        state.answers.upvoted = action.payload.activity.answers.upvoted;
        state.answers.downvoted = action.payload.activity.answers.downvoted;
        state.loadingStatus = `success`;
        state.message = action.payload.message!;
      } else {
        state.loadingStatus = `error`;
      }
    });

    builder.addCase(getActivitiesService.pending, (state, action) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(getActivitiesService.rejected, (state, action) => {
      state.loadingStatus = `error`;
      state.error = action.error;
      state.message = (action.payload as ServerError).message;
    });

    // updateActivityQuestionService
    builder.addCase(
      updateActivityQuestionService.fulfilled,
      (state, action) => {
        if (`activity` in action.payload) {
          state.questions.upvoted = action.payload.activity.questions.upvoted;
          state.questions.downvoted =
            action.payload.activity.questions.downvoted;
          state.questions.bookmarked =
            action.payload.activity.questions.bookmarked;
          state.loadingStatus = `success`;
          state.message = action.payload.message!;
          console.log(`STATE `, current(state))
        }
      }
    );

    builder.addCase(updateActivityQuestionService.pending, (state, action) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(updateActivityQuestionService.rejected, (state, action) => {
      state.loadingStatus = `error`;
      state.error = action.error;
      state.message = `something went wrong..!`;
    });

    // updateActivityAnswerService
    builder.addCase(updateActivityAnswerService.fulfilled, (state, action) => {
      if (`activity` in action.payload) {
        state.answers.upvoted = action.payload.activity.answers.upvoted;
        state.answers.downvoted = action.payload.activity.answers.downvoted;
        state.loadingStatus = `success`;
        state.message = action.payload.message!;
      }
    });

    builder.addCase(updateActivityAnswerService.pending, (state, action) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(updateActivityAnswerService.rejected, (state, action) => {
      state.loadingStatus = `error`;
      state.error = action.error;
      state.message = `something went wrong..!`;
    });
  },
});

export default activitySlice.reducer;
