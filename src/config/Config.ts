import {
    ConfigData,
    ConfigDataType,
    getConfigData,
    PartialConfigDataType,
} from "../data/firebase/firestore/datas/Config";
import { Client } from "../utils/discordJs/interface/Client";
import { Snowflake } from "../utils/discordJs/types/Snowflake";


export class Config {
    public readonly client: Client;
    private readonly col: ConfigData;
    private readonly guildId: Snowflake;

    constructor(client: Client, guildId: Snowflake) {
        this.col = getConfigData();
        this.client = client;
        this.guildId = guildId;
    }

    getConfig() {
        return <ConfigDataType>this.col.get(this.guildId);
    }

    setConfig(data: PartialConfigDataType) {
        return this.col.set(this.guildId, data);
    }
}
