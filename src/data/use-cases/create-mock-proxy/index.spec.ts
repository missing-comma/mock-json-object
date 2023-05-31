import { CreateMockProxyAdapter } from "./index";
import { ICreateMockProxy } from "../../protocols";

const makeSut = () => {
    const stubs: ConstructorParameters<typeof CreateMockProxyAdapter> = [
        { get: jest.fn((payload) => Reflect.get(...payload.args)) }, { set: jest.fn((payload) => Reflect.set(...payload.args)) }
    ]
    const [getter, setter] = stubs;
    const sut = new CreateMockProxyAdapter(getter, setter)
    return { sut, stubs: { getter, setter } }
}

describe("CreateMockProxyAdapter", () => {
    describe("create", () => {
        it("should call getter.get when a property is accessed on the proxy", () => {
            const { sut, stubs } = makeSut();

            const options: ICreateMockProxy.Options = { /* options object */ } as any;
            const proxy = sut.create(options);
            const property = "valid_property";
            const args = [expect.any(Object), property, expect.anything()];

            proxy[property];

            expect(stubs.getter.get).toHaveBeenCalledWith({
                args,
                options,
                onCreate: expect.any(Function),
            });
        });

        it("should call setter.set when a property is set on the proxy", () => {
            const { sut, stubs } = makeSut();

            const options: ICreateMockProxy.Options = { /* options object */ } as any;
            const proxy = sut.create(options);
            const property = "valid_property";
            const value = "value";
            const args = [expect.any(Object), property, value, expect.anything()];

            proxy[property] = value;

            expect(stubs.setter.set).toHaveBeenCalledWith({
                args,
                options,
                onCreate: expect.any(Function),
            });
        });
    });
});
