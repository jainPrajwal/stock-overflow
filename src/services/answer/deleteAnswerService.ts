import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  AnswerResponseType,
  BASE_API,
  
  ServerError,
} from "../../constants";

export const deleteAnswerService = createAsyncThunk(
  `answers/deleteAnswer`,
  async (
    {
      questionId,
      answerId,
    }: {
      questionId: string;
      answerId: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.delete<AnswerResponseType>(
        `${BASE_API}/questions/${questionId}/answers/${answerId}`
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
