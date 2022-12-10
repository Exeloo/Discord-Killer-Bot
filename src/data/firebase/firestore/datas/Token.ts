import { Snowflake } from "../../../../utils/discordJs/types/Snowflake";
import { Collection } from "../interface/Collection";
import { getStore } from "../interface/Store";

const col = "tokens";

export type TokenDataType = {
    token: string;
}

export type PartialTokenDataType = {
    token?: string;
}

class TokenData {
    private collection: Collection | undefined;

    async init() {
        this.collection = await getStore().collection(col);
        return this;
    }

    get(id: string) {
        return <TokenDataType | undefined>this.collection?.doc(id).data();
    }

    set(id: string, data: PartialTokenDataType) {
        return this.collection?.doc(id).set(data);
    }

    getTokens() {
        return <Map<Snowflake, TokenDataType>>this.collection?.queryData();
    }
}

let tokenCollection: TokenData;

export const initTokenData = async () => {
    tokenCollection = await new TokenData().init();
};

export const getTokenData = () => {
    return tokenCollection;
};
