import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_API, ServerError } from "../../constants";

export const loadAnswersOfTheQuestionService = createAsyncThunk(
  `answers/loadAnswersOfTheQuestion`,
  async ({ questionId }: { questionId: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_API}/questions/${questionId}/answers`
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return thunkAPI.rejectWithValue(serverError.response.data);
        }
        return thunkAPI.rejectWithValue(error);
      }
      return thunkAPI.rejectWithValue({
        success: false,
        message: `something went wrong..!`,
        errorMessage: error,
      });
    }
  }
);
