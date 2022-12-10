import { Snowflake } from "../../../../utils/discordJs/types/Snowflake";
import { Collection } from "../interface/Collection";
import { getStore } from "../interface/Store";

const col = "configs";

export type ConfigDataType = {
    event: {
        killer: {
            channels: {
                announcement: Snowflake;
                excludes: Snowflake[];
                log: Snowflake;
                report: Snowflake;
            };
            kill: {
                inactivity: {
                    enable: boolean;
                    rules: {
                        messages: number;
                        time: {
                            indicative: "s" | "m" | "h" | "d" | "w";
                            nb: number;
                        };
                    }[];
                };
                message: {
                    similar: number;
                    sensitive: {
                        accent: boolean;
                        case: boolean;
                        end: boolean;
                        special: boolean;
                        start: boolean;
                    };
                };
                words: string;
            };
        };
    };
}

export type PartialConfigDataType = {}

export class ConfigData {
    private collection: Collection | undefined;

    async init() {
        this.collection = await getStore().collection(col);
        return this;
    }

    get(id: string) {
        return <ConfigDataType | undefined>this.collection?.doc(id).data();
    }

    set(id: string, data: PartialConfigDataType) {
        return this.collection?.doc(id).set(data);
    }
}

let configCollection: ConfigData;

export const initConfigData = async () => {
    configCollection = await new ConfigData().init();
};

export const getConfigData = () => {
    return configCollection;
};
