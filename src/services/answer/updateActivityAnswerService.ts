import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_API, ServerError } from "../../constants";
import { ActivityResponseType as ActivityRequestType } from "../../constants/activity.types";
import { ActivityResponseType } from "../../constants/activity.types";

export const updateActivityAnswerService = createAsyncThunk(
  `activities/updateActivityQuestion`,
  async (
    {
      questionId,
      activity,
    }: {
      questionId: string;
      activity: ActivityRequestType;
    },
    thunkAPI
  ) => {

      try {
        const response = await axios.post<ActivityResponseType>(
          `${BASE_API}/user/activities/questions/${questionId}`,
          {
            ...activity,
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<ServerError>;
          if (serverError && serverError.response) {
            return thunkAPI.rejectWithValue(serverError.response.data);
          } else { 
            return error;
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
);
