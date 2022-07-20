import { createSlice } from "@reduxjs/toolkit";
import { Profile, ProfileState } from "../../constants";

const initialState: ProfileState = {
  loadingStatus: `idle`,
  message: null,
  profile: null,
};

const profileSlice = createSlice({
  name: `profile`,
  initialState,
  reducers: {},
});

export default profileSlice.reducer;
