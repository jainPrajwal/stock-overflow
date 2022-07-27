import {
  configureStore,
  ThunkAction,
  Action,
  EnhancedStore,
} from "@reduxjs/toolkit";

import questionReducer from "../features/question/QuestionSlice";
import answerReducer from "../features/answer/AnswerSlice";
import authReducer from "../features/auth/AuthSlice";
import activityReducer from "../features/activity/ActivitySlice";
import commentReducer from "../features/comment/CommentSlice";
import profileReducer from "../features/profile/ProfileSlice";
import videoReducer from "../features/video/videoSlice";
import axios from "axios";
import {
  AnswersState,
  AuthState,
  ProfileState,
  QuestionsState,
} from "../constants";

const setInterceptors = (
  store: EnhancedStore<{
    question: QuestionsState;
    answer: AnswersState;
    auth: AuthState;
    profile: ProfileState;
  }>
) => {
  if (store.getState().auth.token) {
    axios.defaults.headers.common[`authorization`] = `Bearer ${
      store.getState().auth.token
    }`;
  }
};
const axiosMiddleware = (store: any) => (next: any) => (action: any) => {
  setInterceptors(store);
  return next(action);
};
export const store = configureStore({
  reducer: {
    question: questionReducer,
    answer: answerReducer,
    auth: authReducer,
    activity: activityReducer,
    comment: commentReducer,
    profile: profileReducer,
    video: videoReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(axiosMiddleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
