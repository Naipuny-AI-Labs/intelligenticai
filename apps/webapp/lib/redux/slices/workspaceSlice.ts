import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface WorkspaceState {
  subscription: "trial" | "pro" | "enterprise"
  messagesUsed: number
  messageLimit: number
  isLoading: boolean
  error: string | null
  analytics: {
    totalMessages: number
    activeAgents: number
    avgResponseTime: number
    successRate: number
  }
}

const initialState: WorkspaceState = {
  subscription: "trial",
  messagesUsed: 0,
  messageLimit: 5,
  isLoading: false,
  error: null,
  analytics: {
    totalMessages: 0,
    activeAgents: 0,
    avgResponseTime: 0,
    successRate: 0,
  },
}

// Mock API response for demo purposes
const getMockWorkspaceDetails = (subscription: string) => {
  if (subscription === "pro" || subscription === "enterprise") {
    return {
      subscription,
      messagesUsed: 0, // Pro users don't have message limits
      messageLimit: Number.POSITIVE_INFINITY,
      analytics: {
        totalMessages: 12458,
        activeAgents: 5,
        avgResponseTime: 1.2,
        successRate: 94,
      },
    }
  } else {
    return {
      subscription: "trial",
      messagesUsed: 2,
      messageLimit: 5,
      analytics: {
        totalMessages: 2,
        activeAgents: 1,
        avgResponseTime: 1.5,
        successRate: 90,
      },
    }
  }
}

export const fetchWorkspaceDetails = createAsyncThunk(
  "workspace/fetchDetails",
  async (_, { getState, rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll use the user's subscription from state
      const state = getState() as RootState
      const subscription = state.user.currentUser?.subscription || "trial"

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return getMockWorkspaceDetails(subscription)
    } catch (error) {
      return rejectWithValue("Failed to fetch workspace details")
    }
  },
)

export const fetchWorkspaceAnalytics = createAsyncThunk(
  "workspace/fetchAnalytics",
  async (timeRange: string, { getState, rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll use the user's subscription from state
      const state = getState() as RootState
      const subscription = state.user.currentUser?.subscription || "trial"

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return getMockWorkspaceDetails(subscription).analytics
    } catch (error) {
      return rejectWithValue("Failed to fetch workspace analytics")
    }
  },
)

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    incrementMessagesUsed: (state) => {
      state.messagesUsed += 1
    },
    setWorkspaceDetails: (state, action: PayloadAction<Partial<WorkspaceState>>) => {
      return { ...state, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceDetails.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWorkspaceDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.subscription = action.payload.subscription as "trial" | "pro" | "enterprise"
        state.messagesUsed = action.payload.messagesUsed
        state.messageLimit = action.payload.messageLimit
        state.analytics = action.payload.analytics
      })
      .addCase(fetchWorkspaceDetails.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchWorkspaceAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload
      })
  },
})

export const { incrementMessagesUsed, setWorkspaceDetails } = workspaceSlice.actions
export default workspaceSlice.reducer
