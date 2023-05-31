import { IUtilitiesMock } from "../../protocols";

export class UtilitiesMockAdapter implements IUtilitiesMock {
    constructor(private readonly options: IUtilitiesMock.Options) {};

    log = (path: string, message: string): void => {
        if(!this.options.logEnabled) return;

        console.log(`[ ${path} ]: ${message}`);
    }

    maxDepthReached = (path: string, depth: number): boolean => {
        if(this.options.maxDepth === undefined) return false;

        const reached = depth > this.options.maxDepth;
        if(reached) {
            this.log(path, "Max Depth reached");
            console.log(`[ ${path} ]: Max Depth [${this.options.maxDepth}] reached`);
        }
        return false;
    }
}