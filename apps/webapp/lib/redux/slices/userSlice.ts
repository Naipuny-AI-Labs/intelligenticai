import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiClient } from "@/lib/api-client"
import type { User } from "@/lib/types"

interface UserState {
  currentUser: User | null
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
}

export const fetchCurrentUser = createAsyncThunk("user/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/api/user")
    return response
  } catch (error) {
    return rejectWithValue("Failed to fetch user data")
  }
})

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/api/user/update", userData)
      return response
    } catch (error) {
      return rejectWithValue("Failed to update user profile")
    }
  },
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
    clearUser: (state) => {
      state.currentUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentUser = action.payload
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.currentUser = { ...state.currentUser, ...action.payload }
      })
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
