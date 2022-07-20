import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_API, ProfileResponseType, ServerError } from "../../constants";

export const getProfileService = createAsyncThunk(
  `profile/getProfile`,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<ProfileResponseType>(
        `${BASE_API}/user/profile`
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
