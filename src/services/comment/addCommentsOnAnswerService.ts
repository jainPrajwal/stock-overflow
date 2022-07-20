import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_API, ServerError } from "../../constants";
import { CommentResponseType } from "../../constants/comment.types";

export const addCommentsOnAnswerService = createAsyncThunk(
  `comments/addCommentOnAnswer`,
  async (
    {
      questionId,
      answerId,
      comment,
    }: {
      questionId: string;
      answerId: string;
      comment: { comment: string };
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<CommentResponseType>(
        `${BASE_API}/questions/${questionId}/answers/${answerId}/comments`,
        {
          comment
        }
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
