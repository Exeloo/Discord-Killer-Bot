import Firestore from "firebase-admin/firestore";
import { getDocCacheFromPath, getDocCacheFromRef, updateDocCache } from "./document-cache-management";
import { listCacheCollections } from "./functions/files-functions";
import { getCollectionPath } from "./functions/path-functions";
import { CacheCollection, CacheDocument } from "./types/FirebaseCacheTypes";

export const updateCollectionCache = (q: Firestore.QuerySnapshot<Firestore.DocumentData>) => {
    let isGood = true;
    for (const doc of q.docs) {
        isGood = updateDocCache(doc.ref, doc.data()) ? isGood : false;
    }
    return isGood;
};

export const getCollectionCacheFromQuery = (q: Firestore.QuerySnapshot<Firestore.DocumentData>): CacheCollection => {
    const map = new Map<string, CacheDocument>();
    const ref = q.docs[0].ref.parent;
    for (const doc of q.docs) {
        map.set(doc.id, getDocCacheFromRef(doc.ref));
    }
    return {
        docs: map,
        id: ref.id,
        path: getCollectionPath(ref),
    };
};

export const getCollectionCacheFromRef = (ref: Firestore.CollectionReference): CacheCollection => {
    const map = new Map<string, CacheDocument>();
    const path = getCollectionPath(ref);
    const docs = listCacheCollections(path);
    for (const doc of docs) {
        map.set(doc, getDocCacheFromPath(doc, `${ path }.${ doc }`));
    }
    return {
        docs: map,
        id: ref.id,
        path: getCollectionPath(ref),
    };
};
