import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const searchTermSelector = createSelector(
    (state: RootState) => state.searchTerm,
    (searchTerm) => searchTerm.searchTerm
);
