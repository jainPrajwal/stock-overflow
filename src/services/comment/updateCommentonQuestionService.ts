import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_API, ServerError } from "../../constants";
import {
  CommentRequestType,
  CommentResponseType,
} from "../../constants/comment.types";

export const updateCommentonQuestionService = createAsyncThunk(
  `comments/updateComment`,
  async (
    {
      questionId,
      comment,
      commentId,
    }: {
      questionId: string;
      comment: { comment: string };
      commentId: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<CommentResponseType>(
        `${BASE_API}/questions/${questionId}/comments/${commentId}`,
        {
          comment,
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
