import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RecipeState = {
	recipeId: string;
};

const initialState: RecipeState = {
	recipeId: "",
};

const recipeSlice = createSlice({
	name: "recipeReducer",
	initialState,
	reducers: {
		getRecipeId: (state, action: PayloadAction<string>) => {
			state.recipeId = action.payload;
		},
	},
});

const { actions, reducer } = recipeSlice;

export default reducer;

export const { getRecipeId } = actions;
