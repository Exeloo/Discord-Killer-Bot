import * as Files from "../../../../utils/files/files-functions";
import { convertFirestorePathToSystemPath } from "./path-functions";

const updateCacheFolders = (path: string) => {
    const pathArray = [ "cache", ...path.split(".") ];
    let currentPath = "./";
    for (const dir of pathArray) {
        const dirArray = Files.listDirectories(currentPath);
        if (!dirArray.includes(dir))
            Files.createDirectory(currentPath, dir);
        currentPath = `${ currentPath }/${ dir }`;
    }
};

export const writeCacheDoc = (path: string, data: Object) => {
    updateCacheFolders(path);
    Files.writeFile(`${ convertFirestorePathToSystemPath(path) }/data.json`, JSON.stringify(data));
    return true;
};

export const readCacheDoc = (path: string) => {
    const fileData = Files.readFile(`${ convertFirestorePathToSystemPath(path) }/data.json`);
    return fileData ? JSON.parse(fileData) : undefined;
};

export const listCacheCollections = (path: string) => {
    return Files.listDirectories(convertFirestorePathToSystemPath(path));
};
