import { createSlice } from "@reduxjs/toolkit";

const earningSlice = createSlice({
  name: "Earning",
  initialState: {
    earnings: [],
    loading: false,
  },
  reducers: {
    setEarnings: (state, action) => {
      state.earnings = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setEarnings, setLoading } = earningSlice.actions;
export default earningSlice.reducer;
