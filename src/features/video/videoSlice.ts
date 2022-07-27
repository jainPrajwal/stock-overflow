import { createSlice } from "@reduxjs/toolkit";
import { ServerError } from "../../constants";
import { VideosInitialState } from "../../constants/videos.types";
import { getAllVideos } from "../../services/videos/getAllVideos";

const initialState: VideosInitialState = {
  categories: ["stockmarket", "scams"],
  currentPageNumber: 1,
  loading: `idle`,
  searchQuery: ``,
  selectedCategory: ``,
  sortBy: ``,
  videos: [],
  message: ``,
};

export const videoSlice = createSlice({
  name: `videos`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVideos.pending, function (state) {
      state.loading = `loading`;
    });
    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.videos = action.payload.videos;
      state.loading = `success`;
      state.message = action.payload.message;
    });
    builder.addCase(getAllVideos.rejected, function (state, action) {
      state.loading = `error`;
      state.error = (action.payload as ServerError).message;
    });
  },
});

export default videoSlice.reducer;
