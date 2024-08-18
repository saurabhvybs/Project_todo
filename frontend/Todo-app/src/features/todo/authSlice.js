import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../api/axiosInstance';

// Thunk for login action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log('email:', email);
      console.log('password:', password);

      // Make an API call using axios to the login endpoint
      const response = await axiosInstance.post("/login", { email, password });

      const { token, user } = response.data;
      // Assuming the response contains both
      localStorage.setItem("token", token); // Store token
      localStorage.setItem("email", email); // Store email
      return user;

    } catch (err) {
      // Return error message if the API call fails
      return rejectWithValue(err.response.data.msg || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Load user from localStorage
    isAuthenticated: !!localStorage.getItem('token'),
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      // Clear the user state and isAuthenticated flag
      state.user = null;
      state.isAuthenticated = false;
      
      // Remove JWT and email from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
