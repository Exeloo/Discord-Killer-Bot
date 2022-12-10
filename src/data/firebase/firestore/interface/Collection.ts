import Firestore from "firebase-admin/firestore";
import { getCollectionCacheFromRef, updateCollectionCache } from "../../cache/collection-cache-management";
import { getCollectionPath } from "../../cache/functions/path-functions";
import { Document, getDocument } from "./Document";
import { Store } from "./Store";

const INIT_PATH_ARRAY: string[] = [];

export class Collection {
    public readonly store: Store;
    public readonly ref: Firestore.CollectionReference;
    public readonly id: string;
    public readonly parent?: Document;


    constructor(store: Store, id: string, doc?: Document) {
        this.store = store;
        this.id = id;
        this.parent = doc;

        if (this.parent) {
            this.ref = this.parent.ref.collection(id);
        } else {
            this.ref = store.db.collection(id);
        }
    }

    public initSnapshot() {
        this.ref.onSnapshot(updateCollectionCache);
        return this.ref.get();
    }

    public doc(id: string) {
        return getDocument(this, id);
    }

    public async createDocument(data?: Object) {
        return getDocument(this, (await this.ref.add(data ?? {})).id);
    }

    public queryDocuments() {
        const array: Document[] = [];
        for (const [ id, ] of getCollectionCacheFromRef(this.ref).docs) {
            array.push(this.doc(id));
        }
        return array;
    }

    public queryData() {
        const map = new Map<string, Object>();
        for (const [ id, doc ] of getCollectionCacheFromRef(this.ref).docs) {
            map.set(id, doc.data);
        }
        return map;
    }


}

export const getCollection = async (store: Store, id: string, doc?: Document) => {
    const col = new Collection(store, id, doc);
    const path = getCollectionPath(col.ref);
    if (!INIT_PATH_ARRAY.includes(path)) {
        await col.initSnapshot();
        INIT_PATH_ARRAY.push(path);
    }
    return col;
};
