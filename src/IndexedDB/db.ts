export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("tokenDB", 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            // Create object store for tokens if it doesn't exist
            if (!db.objectStoreNames.contains("adminTokens")) {
                const store = db.createObjectStore("adminTokens", { keyPath: "id", autoIncrement: false });
                store.createIndex("userId", "userId", { unique: false });
                store.createIndex("token", "token", { unique: false });
                store.createIndex("username", "username", { unique: false });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject("Error opening IndexedDB");
        };
    });
};
