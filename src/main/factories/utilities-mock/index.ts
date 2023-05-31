import { IUtilitiesMock } from "../../../data/protocols";
import { UtilitiesMockAdapter } from "../../../data/use-cases/utilities-mock";


export const makeUtilitiesMockFactory = (options: IUtilitiesMock.Options): IUtilitiesMock => {
    return new UtilitiesMockAdapter(options);
}