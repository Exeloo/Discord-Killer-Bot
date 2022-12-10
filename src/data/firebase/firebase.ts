import { ServiceAccount } from "firebase-admin";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../credentials/firebase/killer-discord-game-firebase-adminsdk-36kt3-5d0227e94e.json";


initializeApp({
    credential: cert(<ServiceAccount>serviceAccount),
    databaseURL: "https://killer.firebaseio.com",
});

export const db = getFirestore();
