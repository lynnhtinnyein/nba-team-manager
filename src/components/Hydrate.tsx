"use client";
import { persistor } from "@/store";
import { useEffect } from "react";

const Hydrate = () => {
    const forceClearPersist = async () => {
        persistor.pause();
        persistor.purge();
        persistor.flush();
        localStorage.clear();
        localStorage.setItem("nba-persist-cleared", JSON.stringify(true));
    };

    useEffect(() => {
        const persistCleared = JSON.parse(localStorage.getItem("nba-persist-cleared"));
        if (!persistCleared) {
            console.log("Clearing cart...");
            forceClearPersist();
            forceClearPersist();
            forceClearPersist();
            forceClearPersist();
            forceClearPersist();
        }
    }, []);

    return null;
};

export default Hydrate;
