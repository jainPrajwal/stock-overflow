import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_API, QuestionsResponseType, ServerError } from "../../constants";

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
