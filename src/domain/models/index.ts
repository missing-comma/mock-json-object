import { DeepPartial } from '../types';

export * from './json-like'

export interface IMockObjectOptions<D> {
    readonly initial?: DeepPartial<D>;
    readonly name?: string;
    readonly logEnabled?: boolean;
    readonly wrapAssignmentInMock?: boolean;
    readonly maxDepth?: number;
}