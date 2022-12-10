import Firestore from "firebase-admin/firestore";
import { db } from "../../firebase";
import { getCollection } from "./Collection";

export class Store {
    public readonly db: Firestore.Firestore;

    constructor() {
        this.db = db;
    }

    collection(id: string) {
        return getCollection(this, id);
    }
}

const store = new Store();
export const getStore = () => {
    return store;
};
