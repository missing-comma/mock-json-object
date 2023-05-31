import { IMakePath } from "../../../data/protocols";
import { MakePathAdapter } from "../../../data/use-cases/make-path";

export const makePathFactory = (): IMakePath => {
    return new MakePathAdapter();
}