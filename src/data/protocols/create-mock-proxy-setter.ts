import { ICreateMockProxy } from "./create-mock-proxy"


export interface ICreateMockProxySetter {
    set(payload: ICreateMockProxySetter.Payload): boolean;
}

export declare namespace ICreateMockProxySetter {
    export interface Payload {
        args: [any, any, any, any];
        options: ICreateMockProxy.Options,
        onCreate: (nextOptions: ICreateMockProxy.Options) => any;
    }
}
