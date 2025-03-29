import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        submit: (state, action) => {
            state.value = action.payload;
        },
    },
});

// export const searchSlice = createSlice({
//     name: "search",
//     initialState,
//     reducers: {
//         submit: (state, action) => {
//             state.destination = action.payload.destination;
//             state.experience = action.payload.experience;
//             state.hotelType = action.payload.hotelType;
//         },
//     },
// });

export const { submit } = searchSlice.actions;

export default searchSlice.reducer;
