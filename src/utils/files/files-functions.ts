import fs from "fs";

export const writeFile = (path: string, data: string) => {
    try {
        fs.writeFileSync(path, data);
        return true;
    } catch (e) {
        console.error(`Writing error, try to write ${ path }: ${ e }`);
        return false;
    }
};

export const readFile = (path: string) => {
    try {
        return fs.readFileSync(path).toString();
    } catch (e) {
        console.error(`Reading error, try to read ${ path }: ${ e }`);
        return undefined;
    }
};

export const listDirectories = (path: string) => {
    try {
        return fs.readdirSync(path);
    } catch (e) {
        console.error(`Reading error, try to read directory ${ path }: ${ e }`);
        return [];
    }
};

export const createDirectory = (path: string, name: string) => {
    try {
        fs.mkdirSync(`${ path }/${ name }`);
    } catch (e) {
        console.error(`Writing error, try to create directory ${ name } in ${ path }: ${ e }`);
    }
};
