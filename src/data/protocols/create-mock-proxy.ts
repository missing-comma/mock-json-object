export interface ICreateMockProxy {
    create<D = any>(options: ICreateMockProxy.Options): D;
}

export declare namespace ICreateMockProxy {
    export interface Options<D = any> {
        initial: D|undefined;
        depth: number;
        path: string;
    }
}