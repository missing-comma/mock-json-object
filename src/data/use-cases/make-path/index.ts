import { JSONLikeKeys } from "../../../domain";
import { IMakePath } from "../../protocols";

export class MakePathAdapter implements IMakePath {

    make = (location: string, ...keys: JSONLikeKeys[]): string => {
        return keys.reduce((path: string, key) => this.join(path, key), location);
    }

    private join = (base: string, key: JSONLikeKeys): string => {
        if (typeof key === "number" || String(key).match(/^\d+$/)) {
            return `${base}[${key}]`;
        }
        return `${base}.${key}`;
    }
}