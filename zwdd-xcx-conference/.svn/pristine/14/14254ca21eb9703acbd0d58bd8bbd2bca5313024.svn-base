export default interface Storage {
    setStorage(options: {
        key: string;
        data: string | object;
        complete?(): void;
    }): Promise<void>;
    setStorageSync(options: {
        key: string;
        data: string | object;
    }): void;
    getStorage(options: {
        key: string;
        complete?(): void;
    }): Promise<{
        data: string | object | null;
    }>;
    getStorageSync(options: {
        key: string;
    }): {
        data: string | object | null;
    };
    removeStorage(options: {
        key: string;
        complete?(): void;
    }): Promise<void>;
    removeStorageSync(options: {
        key: string;
    }): void;
}
