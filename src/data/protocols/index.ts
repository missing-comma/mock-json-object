import { JSONLikeKeys } from '../../domain';

export * from './create-mock-proxy'
export * from './create-mock-proxy-getter'
export * from './create-mock-proxy-setter'
export * from './utilities-mock'

export interface IMakePath {
    make(location: string, ...keys: JSONLikeKeys[]): string;
}
