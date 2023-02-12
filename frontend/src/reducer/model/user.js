import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: "",
    refreshToken: "",
    profile: {},
  },
  reducers: {
    loginAction: () => ({}),
    logoutAction: () => ({}),
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
