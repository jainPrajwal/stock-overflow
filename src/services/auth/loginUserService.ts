import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API, UserLoginCredentials } from "../../constants";

export const loginUserService = createAsyncThunk(
  `auth/login`,
  async (userLoginDetails: UserLoginCredentials, thunkAPI) => {
    try {
      console.log(`loginUser `, userLoginDetails)
      const response = await axios.post(`${BASE_API}/login`, {
        user: userLoginDetails,
      });
      console.log(`response `, response)
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);
