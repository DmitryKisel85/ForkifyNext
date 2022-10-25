import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    recipeId: string;
};

const initialState: InitialState = {
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
