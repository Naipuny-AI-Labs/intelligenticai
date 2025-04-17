import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import workspaceReducer from "./slices/workspaceSlice"
import agentsReducer from "./slices/agentsSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    workspace: workspaceReducer,
    agents: agentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
