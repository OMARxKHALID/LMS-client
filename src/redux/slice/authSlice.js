import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    users: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },
  },
});

export const { setUser, clearUser, updateUser, setUsers } = authSlice.actions;
export default authSlice.reducer;
