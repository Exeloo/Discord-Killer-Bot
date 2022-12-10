import { client, setClient } from "../client";
import { getTokenData } from "../data/firebase/firestore/datas/Token";
import { getClients } from "./client-functions";


export const clientInit = async () => {
    const tokens = getTokenData().getTokens();
    const clients = getClients(tokens);
    setClient(clients[0]);
    return client.login();
};
