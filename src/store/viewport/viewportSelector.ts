import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const viewportSizesWidth = createSelector(
    (state: RootState) => state.viewport,
    (viewport) => viewport.width
);

export const viewportSizesHeight = createSelector(
    (state: RootState) => state.viewport,
    (viewport) => viewport.height
);
