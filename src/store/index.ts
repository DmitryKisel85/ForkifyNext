import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import searchReducer from "./search/searchSlice";
import recipeReducer from "./recipe/recipeSlice";
import bookmarksReducer from "./bookmarks/bookmarksSlice";

import { forkifyApi } from "../services/ForkifyServices";

const rootReducer = combineReducers({
    [forkifyApi.reducerPath]: forkifyApi.reducer,
    searchTerm: searchReducer,
    recipeId: recipeReducer,
    bookmarks: bookmarksReducer,
});

// const persistConfig = {
//     key: "root",
//     storage: storage,
//     // blacklist: ["cocktails"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: rootReducer,
    // reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(forkifyApi.middleware),
});

// export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
