import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import cocktailReducer from "./cocktail/cocktailSlice";
// import modalWindowReducer from "./modal/modalWindowSlice";

import searchReducer from "./search/searchSlice";

// import { cocktailSagas } from "./cocktail/cocktailSaga";

const rootReducer = combineReducers({
    searchTerm: searchReducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
    // blacklist: ["cocktails"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
