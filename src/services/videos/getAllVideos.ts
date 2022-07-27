import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ServerError } from "../../constants";
import { FINANCYY_API } from "../../constants/api";
import { VideosResponseType } from "../../constants/videos.types";

export const getAllVideos = createAsyncThunk(
  `videos/getAllVideos`,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<VideosResponseType>(
        `${FINANCYY_API}/videos`,
        {
          params: {
            pageNo: 1,
            limit: 10,
          },
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
