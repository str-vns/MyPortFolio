const storage = localStorage;

export const saveLocal =  ({
    setItem: (key: string, value: unknown) => storage.setItem(key, JSON.stringify(value)),
    getItem: (key: string) => storage.getItem(key) ? JSON.parse(storage.getItem(key) as string) : null,
    removeItem: (key: string) => storage.removeItem(key),
    clear: () => storage.clear()
});