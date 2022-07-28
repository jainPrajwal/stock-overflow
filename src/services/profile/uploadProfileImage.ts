import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ProfileImageResponseType, ServerError } from "../../constants";
import { CLOUDINARY_API } from "../../constants/api";

export const uploadProfileImageService = createAsyncThunk(
  `profileImage/uploadProfileImage`,
  async (
    {
      data,
    }: {
      data: FormData;
    },
    thunkAPI
  ) => {
    try {
      const response = await fetch(`${CLOUDINARY_API}`, {
        method: `post`,
        body: data,
      }).then(res => res.json());
      console.log(`RES `, response)
      return {profileImage: response} as ProfileImageResponseType;
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
