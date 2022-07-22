import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  AuthResponseType,
  BASE_API,
  ServerError,
  UserSignupCredentials,
  
} from "../../constants";

export const signUserService = createAsyncThunk(
  `auth/signup`,
  async (userSignupDetails: UserSignupCredentials, thunkAPI) => {
    try {
      
      const response = await axios.post<AuthResponseType>(`${BASE_API}/signup`, {
        user: userSignupDetails,
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          
          return thunkAPI.rejectWithValue(serverError.response.data);
        }
      }
      
      return thunkAPI.rejectWithValue({
        success: false,
        errorMessage: `something went wrong..!`,
        message: error,
      } as ServerError);
    }
  }
);
