import { ICreateMockProxy, ICreateMockProxyGetter, ICreateMockProxySetter } from "../../protocols";

export class CreateMockProxyAdapter implements ICreateMockProxy {
    constructor(private readonly getter: ICreateMockProxyGetter, private readonly setter: ICreateMockProxySetter) { }

    create = <D = any>(options: ICreateMockProxy.Options): D => {
        const data = options.initial || {};

        const proxyData = data && typeof data === 'object' ? data : {};

        return new Proxy(proxyData, {
            get: (...args) => {
                return this.getter.get({
                    args,
                    options,
                    onCreate: (next) => this.create(next)
                })
            },
            set: (...args) => {
                return this.setter.set({
                    args,
                    options,
                    onCreate: (next) => this.create(next)
                })
            }
        })
    }
}