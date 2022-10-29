import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const bookmarksSelector = createSelector(
    (state: RootState) => state.bookmarks,
    (bookmarks) => bookmarks.bookmarks
);
