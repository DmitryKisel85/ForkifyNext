import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    searchTerm: string;
};

const initialState: InitialState = {
    searchTerm: "",
};

const searchSlice = createSlice({
    name: "searchReducer",
    initialState,
    reducers: {
        searchMeal: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
    },
});

const { actions, reducer } = searchSlice;

export default reducer;

export const { searchMeal } = actions;
