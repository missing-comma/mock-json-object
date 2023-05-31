import { IMockObjectOptions, JSONLike } from './models';
import { DeepPartial, DeepWritable } from './types'

export interface IMakeMock {
    create<D extends JSONLike>(data?: D): DeepWritable<D>;
}

export interface IMockObjectWith<DataLike> {
    <D extends DataLike>(options?: IMockObjectOptions<D>): DeepWritable<D>
}

export interface IMockObject<DataLike> {
    <D extends DataLike>(initial?: DeepPartial<D>, name?: string): DeepWritable<D>
    <D extends DataLike>(name?: string, initial?: DeepPartial<D>): DeepWritable<D>
}

