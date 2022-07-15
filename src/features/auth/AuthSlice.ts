import { createSlice } from "@reduxjs/toolkit";
import { AuthState, ServerError } from "../../constants";
import { loginUserService } from "../../services";

const initialState: AuthState = {
  email: null,
  token: null,
  loadingStatus: `idle`,
  toastMessage: null,
};

const authSlice = createSlice({
  name: `auth`,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loginUserService.fulfilled, (state, action) => {
      state.loadingStatus = `success`;
      console.log(`herer `, action.payload);
      state.email = action.payload.user.email;
      state.token = action.payload.token;
      state.toastMessage = action.payload.message;
    });
    builder.addCase(loginUserService.rejected, (state, action) => {
      state.loadingStatus = `error`;
      state.toastMessage = (action.payload as ServerError).message;
    });
  },
});

export default authSlice.reducer;
