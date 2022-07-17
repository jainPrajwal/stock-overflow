import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  BASE_API,
  QuestionResponseType,
  ServerError,
} from "../../constants";
import { AnswerRequestType } from "../../constants/answer.types";

export const updateAnswerService = createAsyncThunk(
  `answers/updateAnswer`,
  async (
    {
      answerId,
      answer,
    }: {
      answerId: string;
      answer: AnswerRequestType;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<QuestionResponseType>(
        `${BASE_API}/questions/${answerId}`,
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
