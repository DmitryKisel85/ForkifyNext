import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchState = {
	searchTerm: string;
};

const initialState: SearchState = {
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
