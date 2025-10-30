
export interface SearchCacheInterface {
    get(key: string): any | undefined;
    set(key: string, value: any): void;
    has(key: string): boolean;
    clear(): void;
}

class SearchCache {
    private cache: Map<string, any>;

    constructor() {
        this.cache = new Map();
    }

    get(key: string): any | undefined {
        return this.cache.get(key);
    }

    set(key: string, value: any): void {
        this.cache.set(key, value);
        console.log(`SearchCache set: ${key} -> ${value}`);
        console.log('Current Cache State:', Array.from(this.cache.entries()));
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    clear(): void {
        this.cache.clear();
    }
}

export default SearchCache;