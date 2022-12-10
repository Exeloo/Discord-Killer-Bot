import { Collection } from "../interface/Collection";
import { getStore } from "../interface/Store";

const col = "users";

export type UserDataType = {
    displayName: string,
    uid: string,
}

export type PartialUserDataType = {}

class UserData {
    private collection: Collection | undefined;

    async init() {
        this.collection = await getStore().collection(col);
        return this;
    }

    get(id: string) {
        return <UserDataType | undefined>this.collection?.doc(id).data();
    }

    set(id: string, data: PartialUserDataType) {
        return this.collection?.doc(id).set(data);
    }
}

let userCollection: UserData;

export const initUserData = async () => {
    userCollection = await new UserData().init();
};

export const getUserData = () => {
    return userCollection;
};
