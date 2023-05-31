import { DeepWritable, IMockObjectOptions, IMockObject, IMockObjectWith } from '../domain';
import { makeCreateMockProxyFactory } from './factories/create-mock-proxy'

export const makeAnyDataLikeFactories = <DataLike>() => {
    const mockObjectWith: IMockObjectWith<DataLike> = <D extends DataLike>(options: IMockObjectOptions<D> = {}): DeepWritable<D> => {
        const { initial, name = "<root>", ...factoryOptions } = options

        const mockFactory = makeCreateMockProxyFactory(factoryOptions);

        return mockFactory.create<DeepWritable<D>>({
            depth: 0,
            initial: initial as any,
            path: name
        })
    }

    const mockObject: IMockObject<DataLike> = <D extends DataLike>(...args: [any, any]): DeepWritable<D> => {
        const name = args.find(arg => typeof arg === 'string');
        const initial = args.find(arg => arg && typeof arg === 'object');
        return mockObjectWith<D>({ initial, name });
    }

    return {
        mockObjectWith,
        mockObject
    }
}