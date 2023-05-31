/** Object types that should never be mapped */
type AtomicObject = Function | Promise<any> | Date | RegExp | Boolean | Number | String;
/**
 * If the lib "ES2105.collections" is not included in tsconfig.json,
 * types like ReadonlyArray, WeakMap etc. fall back to `any` (specified nowhere)
 * or `{}` (from the node types), in both cases entering an infite recursion in
 * pattern matching type mappings
 * This type can be used to cast these types to `void` in these cases.
 */
export type IfAvailable<T, Fallback = void> = true | false extends (T extends never
    ? true
    : false) ? Fallback
    : keyof T extends never ? Fallback
    : T;

/**
 * These should also never be mapped but must be tested after regular Map and
 * Set
 */
type WeakReferences = IfAvailable<WeakMap<any, any>> | IfAvailable<WeakSet<any>>;

export type WritableDraft<T> = {
    -readonly [K in keyof T]
    : DeepWritable<T[K]>;
};
export type DeepWritable<T> = T extends AtomicObject
    ? T
    : T extends IfAvailable<ReadonlyMap<infer K, infer V>>
    ? Map<DeepWritable<K>, DeepWritable<V>>
    : T extends IfAvailable<ReadonlySet<infer V>>
    ? Set<DeepWritable<V>>
    : T extends WeakReferences
    ? T
    : T extends object
    ? WritableDraft<T>
    : T;

export type PartialDraft<T> = {
    [K in keyof T]?: DeepWritable<T[K]>;
};
export type DeepPartial<T> = T extends AtomicObject
    ? T
    : T extends IfAvailable<ReadonlyMap<infer K, infer V>>
    ? Map<DeepPartial<K>, DeepPartial<V>>
    : T extends IfAvailable<ReadonlySet<infer V>>
    ? Set<DeepPartial<V>>
    : T extends WeakReferences
    ? T
    : T extends object
    ? PartialDraft<T>
    : T;