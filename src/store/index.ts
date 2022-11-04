import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import searchReducer from "./search/searchSlice";
import recipeReducer from "./recipe/recipeSlice";
import bookmarksReducer from "./bookmarks/bookmarksSlice";
import viewportReducer from "./viewport/viewportSlice";

import { forkifyApi } from "../services/ForkifyServices";

const rootReducer = combineReducers({
    [forkifyApi.reducerPath]: forkifyApi.reducer,
    searchTerm: searchReducer,
    recipeId: recipeReducer,
    bookmarks: bookmarksReducer,
    viewport: viewportReducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(forkifyApi.middleware),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
