import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ViewportState = {
	width: number;
	height: number;
};

const initialState: ViewportState = {
	width: window.screen.width,
	height: window.screen.height,
};

const viewportSlice = createSlice({
	name: "viewportReducer",
	initialState,
	reducers: {
		changeViewportSizes: (state, action: PayloadAction<ViewportState>) => {
			state.width = action.payload.width;
			state.height = action.payload.height;
		},
	},
});

const { actions, reducer } = viewportSlice;

export default reducer;

export const { changeViewportSizes } = actions;
