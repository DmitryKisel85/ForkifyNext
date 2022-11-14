import { RootState } from "../index";

export const searchTermSelector = (state: RootState) => state.searchTerm.searchTerm;
