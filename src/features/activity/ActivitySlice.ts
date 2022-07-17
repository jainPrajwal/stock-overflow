import { createSlice, current } from "@reduxjs/toolkit";
import { ActivitiesState } from "../../constants";
import { getActivitiesService } from "../../services/activity/getActivitiesService";
import { updateActivityQuestionService } from "../../services/activity/updateActivityQuestionService";
const initialState: ActivitiesState = {
  questions: {
    upvoted: [],
    downvoted: [],
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
    builder.addCase(getActivitiesService.fulfilled, (state, action) => {
      if (`activity` in action.payload) {
        state.questions.upvoted = action.payload.activity.questions.upvoted;
        state.questions.downvoted = action.payload.activity.questions.downvoted;
        state.answers.upvoted = action.payload.activity.answers.upvoted;
        state.answers.downvoted = action.payload.activity.answers.downvoted;
        state.loadingStatus = `success`;
        state.message = action.payload.message!;
      } else {
        state.loadingStatus = `error`;
      }
    });

    builder.addCase(
      updateActivityQuestionService.fulfilled,
      (state, action) => {
        if (`activity` in action.payload) {
          state.questions.upvoted = action.payload.activity.questions.upvoted;
          state.questions.downvoted =
            action.payload.activity.questions.downvoted;
          state.loadingStatus = `success`;
          state.message = action.payload.message!;
        }
      }
    );

    builder.addCase(updateActivityQuestionService.pending, (state, action) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(updateActivityQuestionService.rejected, (state,action) => {
      state.loadingStatus = `error`;
      state.error = action.error;
      state.message = `something went wrong..!`
    })
  },
});

export default activitySlice.reducer;
