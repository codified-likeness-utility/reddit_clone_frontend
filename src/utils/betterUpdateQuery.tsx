import { Cache, QueryInput } from "@urql/exchange-graphcache";

// Allows usto properly cast types for update cache with URQL
export function betterUpdateQuery<Result, Query>(
	cache: Cache,
	qi: QueryInput,
	result: any,
	fn: (r: Result, q: Query) => Query) {
	return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
