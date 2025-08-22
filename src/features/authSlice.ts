import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = { email: string };

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

// 🔹 Load state from localStorage (if available)
const savedAuth = localStorage.getItem("authState");
const initialState: AuthState = savedAuth
  ? JSON.parse(savedAuth)
  : {
      isAuthenticated: false,
      user: null,
      error: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    loginFailure(state, action: PayloadAction<string | null>) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload ?? "Login failed";
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("authState");
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
