import { clientInit } from "./client/client-init";
import { firebaseInit } from "./data/firebase/firebase-init";


const init = async () => {
    await firebaseInit();
    await clientInit();
};

init();
