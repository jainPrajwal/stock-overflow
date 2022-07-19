import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {  BASE_API, CommentsResponseType, ServerError } from "../../constants";

export const getCommentsOnAnswerService = createAsyncThunk(
  `comments/getCommentsOnAnswer`,
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
      const response = await axios.get<CommentsResponseType>(
        `${BASE_API}/questions/${questionId}/answers/${answerId}/comments`
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return thunkAPI.rejectWithValue(serverError.response.data);
        }
        return error;
      } else {
        console.error(`somehting went wrong..! `, error);
        return thunkAPI.rejectWithValue({
          success: false,
          message: `something went wrong`,
          errorMessage: error,
        });
      }
    }
  }
);
