import {
  type BuildQueryResult,
  type DBQueryConfig,
  type ExtractTablesWithRelations,
} from 'drizzle-orm'
import * as schema from './schema'

/**
 * NOTE:
 * @see https://github.com/drizzle-team/drizzle-orm/issues/695#issuecomment-2066989790
 */
type TSchema = ExtractTablesWithRelations<typeof schema>

type QueryConfig<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>

export type InferQueryModel<
  TableName extends keyof TSchema,
  QBConfig extends QueryConfig<TableName> = {},
> = BuildQueryResult<TSchema, TSchema[TableName], QBConfig>

/**
 * NOTE:
 * Junction tableを排除するユーティリティ型
 */
export type RemoveJunctionTable<
  T,
  JunctionKey extends keyof T,
  ArticleKey extends string,
> =
  T extends Record<JunctionKey, (infer J)[]>
    ? J extends Record<ArticleKey, infer A>
      ? Omit<T, JunctionKey> & Record<JunctionKey, A[]>
      : T
    : T

// ex)
// type RemoveJunctionTable<T> = T extends { likedArticles: (infer J)[] }
//   ? J extends { article: infer A }
//     ? Omit<T, 'likedArticles'> & { likedArticles: A[] }
//     : T
//   : T
// export type ResultWithoutJunction = RemoveJunctionTable<Result>
