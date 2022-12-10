import Firestore from "firebase-admin/firestore";
import { getDocCacheFromRef, updateDocCache } from "../../cache/document-cache-management";
import { Collection, getCollection } from "./Collection";

export class Document {
    public readonly parent: Collection;
    public readonly id: string;
    public readonly ref: Firestore.DocumentReference;

    constructor(collection: Collection, id: string) {
        this.parent = collection;
        this.id = id;
        this.ref = this.parent.ref.doc(id);
    }

    collection(id: string) {
        return getCollection(this.parent.store, id, this);
    }

    data() {
        return getDocCacheFromRef(this.ref).data;
    }

    async set(data: Object) {
        try {
            await this.ref.set(data);
        } catch (e) {
            console.error(`Doc set error ( id: ${ this.id }, parent: ${ this.parent.id } ) :`, e);
            return false;
        }
        updateDocCache(this.ref, data);
        return true;
    }
}

export const getDocument = (collection: Collection, id: string) => {
    return new Document(collection, id);
};
