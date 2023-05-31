export type JSONLikeKeys = string | number;

type Primitives = string | null | number | boolean | Date;

export type JSONLikeValues = Primitives | JSONLikeDict | JSONLikeArray;

export type JSONLikeDict = { readonly [K in JSONLikeKeys]: JSONLikeValues } | Record<JSONLikeKeys, any>
export type JSONLikeArray = ReadonlyArray<JSONLikeValues>

export type JSONLike = JSONLikeDict | JSONLikeArray