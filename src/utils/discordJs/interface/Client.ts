import * as DiscordJS from "discord.js";
import { getTokenData, TokenDataType } from "../../../data/firebase/firestore/datas/Token";
import { Snowflake } from "../types/Snowflake";

export class Client extends DiscordJS.Client {

    public readonly clientId: Snowflake;
    public readonly token: string;

    constructor(clientId: Snowflake) {
        super({
            intents: [
                "Guilds",
                "GuildMessages",
            ],
        });
        this.clientId = clientId;
        this.token = (<TokenDataType>getTokenData().get(clientId)).token;
    }

    async login(): Promise<string> {
        try {
            // console.log(this.token)
            const result = await super.login(this.token);
            console.log(`Logged as : ${ super.user?.tag }`);
            return result;
        } catch (e) {
            console.error("Failed to login client : ", e);
            return "";
        }
    }
}
