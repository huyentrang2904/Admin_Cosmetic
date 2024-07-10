import { configureStore } from "@reduxjs/toolkit";

import { customerProductReducer } from "@/state/Products/Reducer";
import { authReducer } from "@/state/Auth/Reducer";
import { adminReducer } from "@/state/Admin/Reducer";

// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    product: customerProductReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});
