import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TUser {
  id: string;
  name: string;
  email: string;
  token?: string;
}

interface TAuthState {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TAuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
