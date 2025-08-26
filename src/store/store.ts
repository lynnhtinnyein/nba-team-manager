import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";
import persistStorage from "./persistStorage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import authReducer from "./features/auth/authSlice";

const encryptor = encryptTransform({
    secretKey: process.env.NEXT_PUBLIC_PERSIST_KEY ?? "default_key"
});

const persistConfig = {
    key: "nba-manager",
    storage: persistStorage,
    transforms: [encryptor],
    whitelist: ["auth"]
};

const rootReducer = combineReducers({
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
