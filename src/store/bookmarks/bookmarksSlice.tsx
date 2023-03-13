import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RecipeType } from "types";

export type BookmarksState = {
	bookmarks: RecipeType[];
};

const initialState: BookmarksState = {
	bookmarks: [],
};

const bookmarksSlice = createSlice({
	name: "bookmarksReducer",
	initialState,
	reducers: {
		pushBookmarkToStore: (state, action: PayloadAction<RecipeType>) => {
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
