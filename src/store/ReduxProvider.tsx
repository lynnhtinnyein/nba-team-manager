"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import FullPageLoading from "@/components/FullPageLoading";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={<FullPageLoading />} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
