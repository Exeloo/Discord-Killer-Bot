import { Collection } from "../interface/Collection";
import { getStore } from "../interface/Store";

const col = "words";

export type WordDataType = {
    id: string,
    name: string,
    tags: string[],
    words: string[],
}

export type PartialWordDataType = {
    id?: string,
    name?: string,
    tags?: string[],
    words?: string[],
}

class WordData {
    private collection: Collection | undefined;

    async init() {
        this.collection = await getStore().collection(col);
        return this;
    }

    get(id: string) {
        return <WordDataType | undefined>this.collection?.doc(id).data();
    }

    set(id: string, data: PartialWordDataType) {
        return this.collection?.doc(id).set(data);
    }
}

let wordCollection: WordData;

export const initWordData = async () => {
    wordCollection = await new WordData().init();
};

export const getWordData = () => {
    return wordCollection;
};
