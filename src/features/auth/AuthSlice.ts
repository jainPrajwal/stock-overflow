import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../constants";
import { loginUserService } from "../../services";

const initialState: AuthState = {
  email: null,
  token: null,
  loadingStatus: `idle`,
  toastMessage: null
};

const authSlice = createSlice({
  name: `auth`,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loginUserService.fulfilled, (state, action) => {
      state.loadingStatus = `success`;
      state.email = action.payload?.email;
      state.token = action.payload?.token;
      state.toastMessage = action.payload?.message;

    });
  },
});

export default authSlice.reducer;
