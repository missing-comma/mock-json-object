import { CreateMockProxyGetter } from './index';
import { makeClassLikeStub as makeStub } from '@missing-comma/jest-class-stub-maker'
import { ICreateMockProxyGetter, IMakePath, IUtilitiesMock } from "../../protocols";

type Options = ICreateMockProxyGetter.Payload["options"];

const makeArgs = (target?: any, key?: any): ICreateMockProxyGetter.Payload["args"] => {
    return [target, key, expect.anything()];
}

const makeSut = () => {
    const path = makeStub.sync<IMakePath>("make");
    const utils = makeStub.sync<IUtilitiesMock>("log", "maxDepthReached");

    const stubs = { path, utils }
    const sut = new CreateMockProxyGetter(path, utils)
    return { sut, stubs }
}

describe('CreateMockProxyGetter', () => {

    describe('get', () => {
        it('should return the value if the key exists in the target', () => {
            const { sut } = makeSut();
            const target = { key: 'value' };
            const options: Options = { path: "", depth: 0, initial: undefined };
            const args = makeArgs(target, 'key');
            const onCreateMock = jest.fn();

            const result = sut.get({ args, options, onCreate: onCreateMock });

            expect(result).toBe('value');
        });

        it('should return null if max depth is reached', () => {
            const { sut, stubs: { utils } } = makeSut();
            const target = {};
            const args = makeArgs(target, 'key');
            const options: Options = { path: "", depth: 0, initial: undefined };
            const onCreateMock = jest.fn();
            utils.maxDepthReached.mockReturnValue(true);

            const result = sut.get({ args, options, onCreate: onCreateMock });

            expect(result).toBeNull();
            expect(utils.maxDepthReached).toHaveBeenCalledWith(options.path, options.depth);
        });

        it('should create a new value and return it if the key does not exist in the target', () => {
            const { sut, stubs: { utils, path } } = makeSut();

            const target: any = {};
            const args = makeArgs(target, 'newKey');
            const options: Options = { path: '', depth: 0, initial: undefined };
            const onCreateMock = jest.fn().mockReturnValue('newValue');

            path.make.mockReturnValue("subPath")

            const result = sut.get({ args, options, onCreate: onCreateMock });

            expect(path.make).toHaveBeenCalledWith(options.path, 'newKey');
            expect(utils.log).toHaveBeenCalledWith('subPath', 'creating');
            expect(onCreateMock).toHaveBeenCalledWith({
                depth: options.depth + 1,
                initial: undefined,
                path: 'subPath',
            });
            expect(target['newKey']).toBe('newValue');
            expect(result).toBe('newValue');
        });

        it('should return the value if the key is a symbol', () => {
            const { sut, stubs: { utils, path } } = makeSut();
            const symbol = Symbol('key');
            const target = { [symbol]: 'symbolValue' };
            const args = makeArgs(target, symbol);

            const reflectSpy = jest.spyOn(Reflect, "get")

            const options: Options = { path: "", depth: 0, initial: undefined };
            const onCreateMock = jest.fn();

            const result = sut.get({ args, options, onCreate: onCreateMock });

            expect(result).toBe('symbolValue');
            expect(reflectSpy).toHaveBeenCalledWith(...args);

            expect(utils.log).not.toHaveBeenCalled();
            expect(utils.maxDepthReached).not.toHaveBeenCalled();
            expect(path.make).not.toHaveBeenCalled();
            expect(onCreateMock).not.toHaveBeenCalled();


        });
    });
});
