// Import the createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the slice
const initialState = {
    value: "", // This will hold the current search input or value
};

// Create the slice using createSlice
export const searchSlice = createSlice({
    name: "search", // Name of the slice, used as a key in the Redux store
    initialState, // Initial state defined above
    reducers: {
        // Define a reducer named "submit"
        // It updates the state's "value" with the payload from the dispatched action
        submit: (state, action) => {
            state.value = action.payload;
        },
    },
});

// Export the "submit" action so it can be dispatched from components
export const { submit } = searchSlice.actions;

// Export the reducer to be added to the Redux store
export default searchSlice.reducer;
