import { Collection } from "../interface/Collection";
import { getStore } from "../interface/Store";

const col = "statements";

export type StatementDataType = {}

export type PartialStatementDataType = {}

class StatementData {
    private collection: Collection | undefined;

    async init() {
        this.collection = await getStore().collection(col);
        return this;
    }

    get(id: string) {
        return <StatementDataType | undefined>this.collection?.doc(id).data();
    }

    set(id: string, data: PartialStatementDataType) {
        return this.collection?.doc(id).set(data);
    }
}

let statementCollection: StatementData;

export const initStatementData = async () => {
    statementCollection = await new StatementData().init();
};

export const getStatementData = () => {
    return statementCollection;
};
