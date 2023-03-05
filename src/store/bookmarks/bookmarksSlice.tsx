import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Recipe } from "types/generalTypes";

export type BookmarksState = {
	bookmarks: Recipe[];
};

const initialState: BookmarksState = {
	bookmarks: [],
};

const bookmarksSlice = createSlice({
	name: "bookmarksReducer",
	initialState,
	reducers: {
		pushBookmarkToStore: (state, action: PayloadAction<Recipe>) => {
			state.bookmarks.push(action.payload);
		},
		removeBookmarkFromStore: (state, action: PayloadAction<string>) => {
			state.bookmarks = state.bookmarks.filter((bookmark) => bookmark.id !== action.payload);
		},
	},
});

const { actions, reducer } = bookmarksSlice;

export default reducer;

export const { pushBookmarkToStore, removeBookmarkFromStore } = actions;
