"use client";

import { Provider } from "react-redux";
import { persistor, store } from ".";
import { PersistGate } from "redux-persist/integration/react";
import FullScreenLoading from "@/components/FullScreenLoading";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={<FullScreenLoading />} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
