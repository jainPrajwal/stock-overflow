import {
  configureStore,
  ThunkAction,
  Action,
  EnhancedStore,
} from "@reduxjs/toolkit";
import counterReducer, { CounterState } from "../features/counter/counterSlice";
import questionReducer from "../features/question/QuestionSlice";
import answerReducer from "../features/answer/AnswerSlice";
import authReducer from "../features/auth/AuthSlice";
import activityReducer from "../features/activity/ActivitySlice";
import axios from "axios";
import { AnswersState, AuthState, QuestionsState } from "../constants";

const setInterceptors = (
  store: EnhancedStore<{
    counter: CounterState;
    question: QuestionsState;
    answer: AnswersState;
    auth: AuthState;
  }>
) => {
  console.log(`intercepting axios`, store.getState().auth);
  axios.defaults.headers.common[`authorization`] = `Bearer ${
    store.getState().auth.token
  }`;
};
const axiosMiddleware = (store: any) => (next: any) => (action: any) => {
  setInterceptors(store);
  return next(action);
};
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    question: questionReducer,
    answer: answerReducer,
    auth: authReducer,
    activity: activityReducer,
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
