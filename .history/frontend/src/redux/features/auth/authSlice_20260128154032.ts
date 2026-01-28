import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import {
  type AuthResponse,
  type RegisterUserPayload,
  type AuthError,
  initialState,
} from "./types";

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterUserPayload,
  { rejectValue: AuthError }
>("auth/registerUser", async ({ username, password }) => {
  try {
    const { data } = await api.post("/auth/register", {
      username,
      password,
    });

    if (data.token) {
      window.localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  RegisterUserPayload,
  { rejectValue: AuthError }
>("auth/loginUser", async ({ username, password }) => {
  try {
    const { data } = await api.post("/auth/login", {
      username,
      password,
    });

    if (data.token) {
      window.localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getMe = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: AuthError }
>("auth/getMe", async () => {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message || "Something went wrong";
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message || "Something went wrong";
      })
      // Get Me
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = null;
        state.user = action.payload.user;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message || "Something went wrong";
      });
      .addCase(getMe.pending, (state) => {
  state.loading = true;
})
.addCase(getMe.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
})
.addCase(getMe.rejected, (state) => {
  state.loading = false;
  state.user = null;
});
  },
});

export const isCheckAuth = (state: any) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
