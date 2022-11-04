import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    width: number;
    height: number;
};

const initialState: InitialState = {
    width: window.screen.width,
    height: window.screen.height,
};

const viewportSlice = createSlice({
    name: "viewportReducer",
    initialState,
    reducers: {
        changeViewportSizes: (state, action: PayloadAction<InitialState>) => {
            state.width = action.payload.width;
            state.height = action.payload.height;
        },
    },
});

const { actions, reducer } = viewportSlice;

export default reducer;

export const { changeViewportSizes } = actions;
