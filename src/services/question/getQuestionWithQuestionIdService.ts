import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_API, QuestionResponseType, ServerError } from "../../constants";

export const getQuestionWithQuestionIdService = createAsyncThunk(
  `questions/getQuestionWithQuestionId`,
  async (
    {
      questionId,
    }: {
      questionId: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<QuestionResponseType>(
        `${BASE_API}/questions/${questionId}`
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
