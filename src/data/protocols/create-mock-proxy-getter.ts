import { ICreateMockProxy } from "./create-mock-proxy"


export interface ICreateMockProxyGetter {
    get<D = any>(payload: ICreateMockProxyGetter.Payload): D;
}

export declare namespace ICreateMockProxyGetter {
    export interface Payload {
        args: [any, any, any];
        options: ICreateMockProxy.Options
        onCreate: (nextOptions: ICreateMockProxy.Options) => any;
    }
}
