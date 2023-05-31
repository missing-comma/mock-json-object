import { ICreateMockProxy } from "../../../data/protocols";
import { IMockOptions } from "../../../data/models";
import { CreateMockProxyGetter } from "../../../data/use-cases/create-mock-proxy-getter";
import { CreateMockProxySetter } from "../../../data/use-cases/create-mock-proxy-setter";
import { makeUtilitiesMockFactory } from "../utilities-mock";
import { makePathFactory } from "../make-path";
import { CreateMockProxyAdapter } from "../../../data/use-cases/create-mock-proxy";

export const makeCreateMockProxyFactory = (options: IMockOptions): ICreateMockProxy => {
    const utils = makeUtilitiesMockFactory(options);
    const path = makePathFactory();

    const getter = new CreateMockProxyGetter(path, utils);
    const setter = new CreateMockProxySetter(options, path, utils);

    return new CreateMockProxyAdapter(getter, setter);
}