export interface CacheCollectionResolvable {
    id: string;
    path: string;
}

export interface CacheDocument {
    collections: CacheCollectionResolvable[];
    data: Object;
    id: string;
    path: string;
}

export interface CacheCollection extends CacheCollectionResolvable {
    docs: Map<string, CacheDocument>;
}
