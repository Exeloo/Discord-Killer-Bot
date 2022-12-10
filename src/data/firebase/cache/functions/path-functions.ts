import Firestore from "firebase-admin/firestore";

export const getCollectionPath = (colRef: Firestore.CollectionReference) => {
    let path: string = colRef.id;

    while (colRef.parent) {
        path = `${ colRef.parent.parent.id }.${ colRef.parent.id }.` + path;
        colRef = colRef.parent.parent;
    }
    return path;
};

export const getDocPath = (docRef: Firestore.DocumentReference) => {
    let colRef: Firestore.CollectionReference = docRef.parent;
    return `${ getCollectionPath(colRef) }.${ docRef.id }`;
};

export const convertFirestorePathToSystemPath = (path: string) => {
    return `cache/${ path.replace(/\./gi, "/") }`;
};
