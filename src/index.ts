import { JSONLike } from './domain';
import { makeAnyDataLikeFactories } from './main/make-any-data-like-factories'

const json = makeAnyDataLikeFactories<JSONLike>();
const any = makeAnyDataLikeFactories<any>();

export const { mockObject: mockJSONObject, mockObjectWith: mockJSONObjectWith } = json;
export const { mockObject: mockAnyObject, mockObjectWith: mockAnyObjectWith } = any;



