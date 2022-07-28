import { createSlice } from "@reduxjs/toolkit";
import { ProfileImageState, ServerError } from "../../constants";
import { uploadProfileImageService } from "../../services/profile/uploadProfileImage";

const initialState: ProfileImageState = {
  message: null,
  loadingStatus: `idle`,
  profileImage: null,
  error: null,
};

const ProfileImageSlice = createSlice({
  name: `profileImage`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadProfileImageService.fulfilled, (state, action) => {
      state.profileImage = action.payload.profileImage;
      state.loadingStatus = `success`;
    });

    builder.addCase(uploadProfileImageService.pending, (state) => {
      state.loadingStatus = `loading`;
    });

    builder.addCase(uploadProfileImageService.rejected, (state, action) => {
      state.loadingStatus = `error`;
      state.message = (action.payload as ServerError).message;
      state.error = action.error;
    });
  },
});

export default ProfileImageSlice.reducer;
