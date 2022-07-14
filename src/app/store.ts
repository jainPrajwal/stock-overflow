import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import questionReducer from "../features/question/QuestionSlice";
const authReducer = () => {};
const profileReducer = () => {};
const commentReducer = () => {};
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    question: questionReducer,
  
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
