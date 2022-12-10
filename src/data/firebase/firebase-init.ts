import { initConfigData } from "./firestore/datas/Config";
import { initStatementData } from "./firestore/datas/Statement";
import { initTokenData } from "./firestore/datas/Token";
import { initUserData } from "./firestore/datas/User";
import { initWordData } from "./firestore/datas/Word";

export const firebaseInit = () => {
    return Promise.all([
        initConfigData(),
        initStatementData(),
        initTokenData(),
        initUserData(),
        initWordData(),
    ]);
};
