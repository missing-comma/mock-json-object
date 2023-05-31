import { ICreateMockProxyGetter, IMakePath, IUtilitiesMock } from "../../protocols";

export class CreateMockProxyGetter implements ICreateMockProxyGetter {
    constructor(private readonly path: IMakePath, private readonly utils: IUtilitiesMock) { }

    get = (payload: ICreateMockProxyGetter.Payload) => {
        const { args, options } = payload;
        const [target, key] = args;

        if (typeof key === 'symbol') {
            return Reflect.get(...args);
        }

        const initial = options.initial || {};
        if (key in target) {
            return target[key];
        }
        if (key in initial) {
            const value = initial[key];
            if (value && typeof value === "object") {
                if (this.utils.maxDepthReached(options.path, options.depth)) {
                    target[key] = null;
                    return null;
                }
                target[key] = Object.assign(this.createSub(payload), value);
            } else {
                target[key] = value;
                return target[key];
            }
        }

        if (this.utils.maxDepthReached(options.path, options.depth)) {
            target[key] = null;
            return null;
        }

        target[key] = this.createSub(payload);
        return target[key];
    }

    private createSub = ({ args, options, onCreate }: ICreateMockProxyGetter.Payload) => {
        const [_, key] = args;
        const subPath = this.path.make(options.path, key)
        this.utils.log(subPath, "creating");
        return onCreate({
            depth: options.depth + 1,
            initial: options.initial?.[key],
            path: subPath
        })
    }
}