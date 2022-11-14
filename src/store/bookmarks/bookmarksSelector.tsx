import { RootState } from "../index";

export const bookmarksSelector = (state: RootState) => state.bookmarks.bookmarks;
