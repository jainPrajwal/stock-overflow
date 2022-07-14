import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios, { Axios, AxiosError } from "axios";
import { BASE_API } from "../../constants/api";

export type Vote = {
  votes: {
    upvotes: {
      count: number;
      points: number;
    };
    downvotes: {
      count: number;
      points: number;
    };
  };
};

export type Profile = {
  name: string;
  email: string;
  reputation: number;
};
export type Question = {
  _id: string;
  title: string;
  description: string;
  tags: Array<string>;
  isDeleted: boolean;
  votes: Vote;
  questioner: Profile;
  isFlaged: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
};

export type QuestionsResponseType = {
  success: boolean;
  message: string;
  errorMessage?: string;
  questions: Array<Question>;
};

export type ServerError = {
  success: boolean;
  message: string;
  errorMessage?: string;
};
export type QuestionsState = {
  questions: Array<Question>;
  loadingStatus: `idle` | `loading` | `success` | `error`;
  error: unknown;
};

const initialState: QuestionsState = {
  questions: [],
  loadingStatus: `idle`,
  error: null,
};
export const loadQuestions = createAsyncThunk(
  `questions/loadQuestions`,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<QuestionsResponseType>(
        `${BASE_API}/questions`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return thunkAPI.rejectWithValue(serverError.response.data);
        }
      }
      console.error(`something went wrong..! `, error);
      return thunkAPI.rejectWithValue({
        errorMessage: `something went wrong`,
        success: false,
      });
    }
  }
);
export const QuestionSlice = createSlice({
  name: `question`,
  initialState,
  reducers: {
    addQuestionButtonPressed: (state, action: PayloadAction<string>) => {
      return state;
    },
    saveToDraftsButtonPressed: (state, action: PayloadAction<string>) => {
      return state;
    },
    deleteQuestionButtonPressed: (state, action: PayloadAction<string>) => {
      return state;
    },
    updateQuestionButtonPressed: (state, action: PayloadAction<string>) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadQuestions.fulfilled, (state, action) => {
      state.questions = action.payload.questions;
      state.loadingStatus = `success`;
    });
    builder.addCase(loadQuestions.pending, (state) => {
      state.loadingStatus = `loading`;
    });
    builder.addCase(loadQuestions.rejected, (state, action) => {
      console.log(`falied `, action.payload);
      console.log(`failed... `, action.error);
      state.loadingStatus = `error`;
      state.error = (action.payload as ServerError).message;
    });
  },
});

export const {
  addQuestionButtonPressed,
  deleteQuestionButtonPressed,
  saveToDraftsButtonPressed,
  updateQuestionButtonPressed,
} = QuestionSlice.actions;

export default QuestionSlice.reducer;
