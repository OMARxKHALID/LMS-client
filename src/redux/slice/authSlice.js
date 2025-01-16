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
    updateUsersRole: (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload.userId
          ? { ...user, role: action.payload.role }
          : user
      );
    },
    updateUsersStatus: (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload.userId
          ? { ...user, status: action.payload.status }
          : user
      );
    },
  },
});

export const {
  setUser,
  clearUser,
  updateUser,
  setUsers,
  updateUsersRole,
  updateUsersStatus,
} = authSlice.actions;
export default authSlice.reducer;
