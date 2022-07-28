import { createSlice, current } from "@reduxjs/toolkit";
import { ProfileState, ServerError } from "../../constants";
import { getProfileService } from "../../services";
import { updateProfileService } from "../../services/profile/updateProfileService";

const initialState: ProfileState = {
  loadingStatus: `idle`,
  message: null,
  profile: null,
};

const profileSlice = createSlice({
  name: `profile`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    // getProfileService
    builder.addCase(getProfileService.fulfilled, (state, action) => {
      if (`profile` in action.payload) {
        state.loadingStatus = `success`;
        state.profile = action.payload.profile;

        state.message = action.payload.message;
      }
    });

    builder.addCase(getProfileService.pending, (state) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(getProfileService.rejected, (state, action) => {
      state.loadingStatus = `error`;
      state.message = (action.payload as ServerError)?.message;
      state.errorMessage = action.error.message;
    });

    // updateProfileService
    builder.addCase(updateProfileService.fulfilled, (state, action) => {
      if (`profile` in action.payload) {
        console.log(`FROM SLICE `, action.payload.profile)
        state.profile = action.payload.profile;
        state.loadingStatus = `success`;
        state.message = action.payload.message;
      }
    });

    builder.addCase(updateProfileService.pending, (state, action) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(updateProfileService.rejected, (state, action) => {
      state.loadingStatus = `error`;
      state.message = (action.payload as ServerError).message;
    });
  },
});

export default profileSlice.reducer;
