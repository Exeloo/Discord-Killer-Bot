import { getConfigData } from "./firebase/firestore/datas/Config";
import { getUserData } from "./firebase/firestore/datas/User";
import { getWordData } from "./firebase/firestore/datas/Word";

class Data {
    get configs() {
        return getConfigData();
    }

    get users() {
        return getUserData();
    }

    get words() {
        return getWordData();
    }
}

export const getData = () => {
    return new Data();
};
