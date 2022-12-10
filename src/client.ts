import { Client } from "./utils/discordJs/interface/Client";

export let client: Client;

export const setClient = (c: Client) => {
    client = c;
};
