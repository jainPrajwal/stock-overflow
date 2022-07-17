import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  ActivitiesState,
  ActivityResponseType,
  BASE_API,
  ServerError,
} from "../../constants";

export const getActivitiesService = createAsyncThunk(
  `activities/getActivities`,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<ActivityResponseType>(
        `${BASE_API}/user/activities`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return thunkAPI.rejectWithValue(serverError.response.data);
        } else return thunkAPI.rejectWithValue(error);
      } else {
        return thunkAPI.rejectWithValue({
          success: `false`,
          message: `somehting went wrong..!`,
          errorMessage: error,
        });
      }
    }
  }
);
