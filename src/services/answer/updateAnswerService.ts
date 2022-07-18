import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_API, ServerError } from "../../constants";
import {
  AnswerRequestType,
  AnswersResponseType,
} from "../../constants/answer.types";

export const updateAnswerService = createAsyncThunk(
  `answers/updateAnswer`,
  async (
    {
      answerId,
      questionId,
      answer,
    }: {
      answerId: string;
      answer: AnswerRequestType;
      questionId: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<AnswersResponseType>(
        `${BASE_API}/questions/${questionId}/answers/${answerId}`,
        {
          answer,
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return thunkAPI.rejectWithValue(serverError.response.data);
        }
      }
      return thunkAPI.rejectWithValue({
        success: false,
        message: `something went wrong..!`,
        errorMessage: error,
      });
    }
  }
);
