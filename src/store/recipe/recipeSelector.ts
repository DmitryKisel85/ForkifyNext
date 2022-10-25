import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const recipeIdSelector = createSelector(
    (state: RootState) => state.recipeId,
    (recipeId) => recipeId.recipeId
);
