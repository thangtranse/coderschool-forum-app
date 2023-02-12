import { createSlice } from "@reduxjs/toolkit";
// Query

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = [];
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
