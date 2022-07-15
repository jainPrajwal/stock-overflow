import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import questionReducer from "../features/question/QuestionSlice";
import answerReducer from "../features/answer/AnswerSlice";
import authReducer from "../features/auth/AuthSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    question: questionReducer,
    answer: answerReducer,
    auth: authReducer,
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
