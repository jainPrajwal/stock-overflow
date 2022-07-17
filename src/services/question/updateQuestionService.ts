import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  BASE_API,
  Question,
  QuestionResponseType,
  ServerError,
  UpdateQuestionParamsType,
} from "../../constants";

export const updateQuestionService = createAsyncThunk(
  `questions/updateQuestion`,
  async (
    {
      questionId,
      question,
    }: {
      questionId: string;
      question: UpdateQuestionParamsType;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<QuestionResponseType>(
        `${BASE_API}/questions/${questionId}`,
        {
          question,
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
