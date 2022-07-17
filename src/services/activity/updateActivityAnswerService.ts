import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_API, ServerError } from "../../constants";

export const updateActivityAnswerService = createAsyncThunk(
  `activities/updateActivityQuestion`,
  async ({ answerId }: { answerId: string }, thunkAPI) => {
    if (answerId) {
      try {
        const response = await axios.post(
          `${BASE_API}/user/activity/questions/${answerId}`
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<ServerError>;
          if (serverError && serverError.response) {
            return thunkAPI.rejectWithValue(serverError.response.data);
          }
        } else {
          return thunkAPI.rejectWithValue({
            success: false,
            message: `somehting went wong while updating the question`,
            errorMessage: error,
          });
        }
      }
    }
  }
);
