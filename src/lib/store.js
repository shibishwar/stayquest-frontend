// Import necessary functions from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Import the API service created using RTK Query
import { api } from "./api";

// Import a custom reducer for managing search-related state
import searchReducer from "./features/searchSlice";

// Create and configure the Redux store
export const store = configureStore({
    // Register reducers
    reducer: {
        // RTK Query's API reducer (handles caching, loading, etc.)
        [api.reducerPath]: api.reducer,

        // Custom slice reducer for search functionality
        search: searchReducer,
    },

    // Add middleware to handle async logic, including RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

// Enable refetching on focus or reconnect for RTK Query hooks
setupListeners(store.dispatch);
