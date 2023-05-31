import { ICreateMockProxySetter, IMakePath, IUtilitiesMock } from "../../protocols";
import { IMockOptions } from "../../models"

export class CreateMockProxySetter implements ICreateMockProxySetter {
    constructor(
        private readonly options: IMockOptions,
        private readonly makePath: IMakePath, private readonly utils: IUtilitiesMock) { }

    set = ({ args, options, onCreate }: ICreateMockProxySetter.Payload): boolean => {
        const [target, key, value] = args;
        if (typeof key === 'symbol') {
            return Reflect.set(...args);
        }
        const subPath = this.makePath.make(options.path, key)

        if (key in target) {
            this.utils.log(subPath, "setting");
        } else {
            this.utils.log(subPath, "overwritting");
        }
        if (this.options.wrapAssignmentInMock) {
            if (Array.isArray(value)) {
                const mockedArray = value.map((item, index) => {
                    return onCreate({
                        depth: options.depth + 2,
                        initial: item,
                        path: this.makePath.make(options.path, key, index)
                    })
                })
                target[key] = mockedArray;
                return true;
            } else if (value && typeof value === 'object') {
                target[key] = onCreate({
                    depth: options.depth + 1,
                    initial: value,
                    path: this.makePath.make(options.path, key)
                });
                return true;
            }
        }
        target[key] = value;
        return true;
    }
}