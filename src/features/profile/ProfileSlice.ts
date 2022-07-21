import { createSlice, current } from "@reduxjs/toolkit";
import { ProfileState } from "../../constants";
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
    builder.addCase(getProfileService.fulfilled, (state, action) => {
      if (`profile` in action.payload) {
        state.loadingStatus = `success`;
        state.profile = action.payload.profile;
        console.log(`CURREENT STTAE`, current(state));
        state.message = action.payload.message;
      }
    });

    builder.addCase(updateProfileService.fulfilled, (state, action) => {
      if (`profile` in action.payload) {
        state.profile = action.payload.profile;
        state.loadingStatus = `success`;
        state.message = action.payload.message;
      }
    });
  },
});

export default profileSlice.reducer;
