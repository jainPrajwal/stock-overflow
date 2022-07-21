import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_API, ProfileRequestType, ProfileResponseType, ServerError } from "../../constants";

export const updateProfileService = createAsyncThunk(
  `profile/updateProfile`,
  async (
    {
      profile,
    }: {
      profile: ProfileRequestType;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<ProfileResponseType>(`${BASE_API}/user/profile`, {
        profile,
      });
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
