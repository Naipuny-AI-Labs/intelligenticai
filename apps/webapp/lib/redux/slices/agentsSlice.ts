import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { getAgents } from "@/lib/agents"
import { agentService } from "@/lib/agent-service"
import type { Agent } from "@/lib/types"
import type { RootState } from "../store"

interface AgentsState {
  allAgents: Agent[]
  approvedAgents: Agent[]
  trialAgent: Agent | null
  isLoading: boolean
  error: string | null
}

const initialState: AgentsState = {
  allAgents: [],
  approvedAgents: [],
  trialAgent: null,
  isLoading: false,
  error: null,
}

export const fetchAllAgents = createAsyncThunk("agents/fetchAll", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // For demo, we'll use the mock data
    const agents = getAgents()
    return agents
  } catch (error) {
    return rejectWithValue("Failed to fetch agents")
  }
})

export const fetchUserAgents = createAsyncThunk("agents/fetchUserAgents", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const userId = state.user.currentUser?.id || ""
    const subscription = state.user.currentUser?.subscription || "trial"

    // Use the agent service to get agents based on subscription
    const approvedAgents = await agentService.getAgentsForUser(userId, subscription)
    return approvedAgents
  } catch (error) {
    return rejectWithValue("Failed to fetch user agents")
  }
})

export const fetchPendingRequests = createAsyncThunk("agents/fetchPendingRequests", async (_, { rejectWithValue }) => {
  try {
    // Placeholder for fetching pending requests
    return []
  } catch (error) {
    return rejectWithValue("Failed to fetch pending requests")
  }
})

export const fetchTrialAgent = createAsyncThunk("agents/fetchTrialAgent", async (_, { rejectWithValue }) => {
  try {
    // Get the first agent as the trial agent
    const agent = await agentService.getAgent("1")
    return agent
  } catch (error) {
    return rejectWithValue("Failed to fetch trial agent")
  }
})

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setApprovedAgents: (state, action: PayloadAction<Agent[]>) => {
      state.approvedAgents = action.payload
    },
    setTrialAgent: (state, action: PayloadAction<Agent>) => {
      state.trialAgent = action.payload

      // For trial users, ensure the trial agent is in the approved agents list
      if (!state.approvedAgents.some((agent) => agent.id === action.payload.id)) {
        state.approvedAgents = [action.payload]
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAgents.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllAgents.fulfilled, (state, action) => {
        state.isLoading = false
        state.allAgents = action.payload
      })
      .addCase(fetchAllAgents.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchUserAgents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUserAgents.fulfilled, (state, action) => {
        state.isLoading = false
        state.approvedAgents = action.payload
      })
      .addCase(fetchUserAgents.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(fetchTrialAgent.fulfilled, (state, action) => {
        state.trialAgent = action.payload

        // For trial users, ensure the trial agent is in the approved agents list
        if (!state.approvedAgents.some((agent) => agent.id === action.payload.id)) {
          state.approvedAgents = [action.payload]
        }
      })
  },
})

export const { setApprovedAgents, setTrialAgent } = agentsSlice.actions
export default agentsSlice.reducer
