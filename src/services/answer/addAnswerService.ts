import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AnswerResponseType, BASE_API, ServerError } from "../../constants";
import { AnswerRequestType } from "../../constants/answer.types";

export const addAnswerService = createAsyncThunk(
  `answers/addAnswer`,
  async (
    {
      questionId,
      answer,
    }: {
      questionId: string;
      answer: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<AnswerResponseType>(
        `${BASE_API}/questions/${questionId}/answers`,
        {
          answer: {
            answer
          },
        }
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
