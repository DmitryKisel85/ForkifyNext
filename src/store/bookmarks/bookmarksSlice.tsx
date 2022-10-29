import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Recipe } from "../../types/generalTypes";

type InitialState = {
    bookmarks: Recipe[];
};

const initialState: InitialState = {
    bookmarks: [],
};

const bookmarksSlice = createSlice({
    name: "bookmarksReducer",
    initialState,
    reducers: {
        pushBookmarkToStore: (state, action: PayloadAction<Recipe>) => {
            state.bookmarks.push(action.payload);
        },
        removeBookmarkFromStore: (state, action) => {
            console.log(action.payload);

            state.bookmarks = state.bookmarks.filter(
                (bookmark) => bookmark.id !== action.payload
            );
        },
    },
});

const { actions, reducer } = bookmarksSlice;

export default reducer;

export const { pushBookmarkToStore, removeBookmarkFromStore } = actions;
