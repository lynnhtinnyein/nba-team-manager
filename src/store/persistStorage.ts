import createWebStorage from "redux-persist/es/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: string) {
            console.log(_key);
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        }
    };
};

const isClient = () => typeof window !== "undefined";

const persistStorage = isClient() ? createWebStorage("local") : createNoopStorage();

export default persistStorage;
