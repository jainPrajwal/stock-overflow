import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_API, ServerError } from "../../constants";
import {
  CommentResponseType,
} from "../../constants/comment.types";

export const deleteCommentonAnswerService = createAsyncThunk(
  `comments/deleteCommentOnAnswer`,
  async (
    {
      questionId,

      commentId,
      answerId,
    }: {
      questionId: string;
      commentId: string;
      answerId: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.delete<CommentResponseType>(
        `${BASE_API}/questions/${questionId}/answers/${answerId}/comments/${commentId}`
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
