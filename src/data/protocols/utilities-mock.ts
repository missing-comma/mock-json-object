
export interface IUtilitiesMock {
    log(path: string, message: string): void;
    maxDepthReached(path: string, depth: number): boolean;
}

export declare namespace IUtilitiesMock {
    export interface Options {
        logEnabled?: boolean;
        maxDepth?: number;
    }
}