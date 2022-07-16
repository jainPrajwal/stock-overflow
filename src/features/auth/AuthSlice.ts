import { createSlice } from "@reduxjs/toolkit";
import { AuthState, ServerError } from "../../constants";
import { loginUserService } from "../../services";

const localStorageToken = localStorage.getItem(`user`);
const token = localStorageToken && JSON.parse(localStorageToken).token;

const initialState: AuthState = {
  email: null,
  token: token ?? null,
  loadingStatus: `idle`,
  toastMessage: null,
};

console.log(`auth slice running...!`);

const authSlice = createSlice({
  name: `auth`,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loginUserService.fulfilled, (state, action) => {
      state.loadingStatus = `success`;

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
