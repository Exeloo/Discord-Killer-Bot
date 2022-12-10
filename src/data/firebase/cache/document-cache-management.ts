import Firestore from "firebase-admin/firestore";
import { listCacheCollections, readCacheDoc, writeCacheDoc } from "./functions/files-functions";
import { getDocPath } from "./functions/path-functions";
import { CacheDocument } from "./types/FirebaseCacheTypes";

export const updateDocCache = (ref: Firestore.DocumentReference, data: Object) => {
    const path = getDocPath(ref);
    return writeCacheDoc(path, data);
};

export const getDocCacheFromRef = (ref: Firestore.DocumentReference): CacheDocument => {
    const path = getDocPath(ref);
    return getDocCacheFromPath(ref.id, path);
};

export const getDocCacheFromPath = (id: string, path: string): CacheDocument => {
    const collectionsFolders = listCacheCollections(path);
    return {
        collections: collectionsFolders.map((e) => {
            return { id: e, path: `${ path }.${ e }` };
        }),
        data: readCacheDoc(path),
        path,
        id: id,
    };
};
