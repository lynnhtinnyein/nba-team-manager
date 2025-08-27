import createWebStorage from "redux-persist/es/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
