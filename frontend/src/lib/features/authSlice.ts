// authSlice.ts
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../store"; // Import your store types
import { fetchHttpClient, setHttpClientToken } from "@/modules/common"; // Assuming this is your HTTP client

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk<
  { token: string; user: User },
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetchHttpClient("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to login.");
    }

    const data = await response.json();
    console.log("🚀 ~ > ~ data:", data);
    setHttpClientToken(data.token);
    return data as { token: string; user: User };
  } catch (error) {
    return rejectWithValue("Failed to login.");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      setHttpClientToken(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to login.";
      });
  },
});

export const { logout, setAuthToken } = authSlice.actions;

export const selectSelf = (state: RootState) => state.auth;
export const selectAuthToken = createSelector(
  selectSelf,
  (state) => state.token
);
export const selectAuthError = createSelector(
  selectSelf,
  (state) => state.error
);
export const selectAuthenticatedUser = createSelector(
  selectSelf,
  (state) => state.user
);

export default authSlice.reducer;
