import { mockJSONObjectWith as sut } from './index'

interface TesteString {
    a: string;
}

interface TesteArray {
    a: string[];
}

interface TesteDeep {
    a: { b: { c: { d: string } } }
}

describe("main", () => {
    describe("plain", () => {
        test("string", () => {
            const mock = sut<TesteString>();
            mock.a = "batata"

            const getValue = (value: TesteString) => {
                return value.a;
            }

            expect(getValue(mock)).toBe("batata");
        });

        test("array", () => {
            const mock = sut<TesteArray>();
            mock.a[2] = "batata"

            const getValue = (value: TesteArray) => {
                return value.a[2];
            }

            expect(getValue(mock)).toBe("batata");
        })

        test("deep", () => {
            const mock = sut<TesteDeep>();
            mock.a.b.c.d = "batata"

            const getValue = (value: TesteDeep) => {
                return value.a.b.c.d;
            }

            expect(getValue(mock)).toBe("batata");
        })
    })

    describe("log", () => {
        const spyConsoleLog = () => {
            const spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
            spy.mockClear();
            return spy;
        }

        test("with string key", () => {
            const mock = sut<TesteDeep>({ logEnabled: true });

            const logSpy = spyConsoleLog()

            mock.a;

            expect(logSpy).toHaveBeenCalledTimes(1);
            expect(logSpy).toHaveBeenCalledWith("[ <root>.a ]: creating");
        })

        test("with number key", () => {
            spyConsoleLog();
            const mock = sut<TesteArray>({ logEnabled: true });

            mock.a;

            const logSpy = spyConsoleLog()

            mock.a[2];

            expect(logSpy).toHaveBeenCalledTimes(1);
            expect(logSpy).toHaveBeenCalledWith("[ <root>.a[2] ]: creating");
        })

    });
})