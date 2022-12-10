import { TokenDataType } from "../data/firebase/firestore/datas/Token";
import { Client } from "../utils/discordJs/interface/Client";
import { Snowflake } from "../utils/discordJs/types/Snowflake";


export const getClients = (map: Map<Snowflake, TokenDataType>) => {
    const clientArray = [];
    for (const [ clientId ] of map) {
        clientArray.push(new Client(clientId));
    }
    return clientArray;
};
