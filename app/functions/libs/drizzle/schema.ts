import { relations, sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// Users Table
export const users = sqliteTable('users', {
  // auth.js must have below here
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp' }),
  image: text('image'),
  // auth.js must have above here
  hashedPassword: text('hashedPassword'),
  role: text('role'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// Users Relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(articles),
  likedArticles: many(likedArticles),
  accounts: many(accounts),
  sessions: many(sessions),
}))

// Articles table
export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  status: text('status').notNull(),
  authorId: text('authorId')
    .notNull()
    .references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// Articles Relations
export const articlesRelations = relations(articles, ({ one, many }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
  categories: many(articlesCategories),
  likedUsers: many(likedArticles),
}))

// Categories table
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// Categories Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  articles: many(articlesCategories),
}))

// Article-Category junction table (many-to-many)
export const articlesCategories = sqliteTable(
  'articlesCategories',
  {
    articleId: text('articleId')
      .notNull()
      .references(() => articles.id),
    categoryId: text('categoryId')
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.articleId, t.categoryId] }),
  }),
)

// Article-Category Relations
export const articlesCategoriesRelations = relations(
  articlesCategories,
  ({ one }) => ({
    article: one(articles, {
      fields: [articlesCategories.articleId],
      references: [articles.id],
    }),
    category: one(categories, {
      fields: [articlesCategories.categoryId],
      references: [categories.id],
    }),
  }),
)

// Article-LikedUsers junction table (many-to-many)
export const likedArticles = sqliteTable(
  'likedArticles',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id),
    articleId: text('articleId')
      .notNull()
      .references(() => articles.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.articleId] }),
  }),
)

export const likedArticlesRelations = relations(likedArticles, ({ one }) => ({
  user: one(users, {
    fields: [likedArticles.userId],
    references: [users.id],
  }),
  article: one(articles, {
    fields: [likedArticles.articleId],
    references: [articles.id],
  }),
}))

/**
 * ================================
 * NextAuth tables
 * ===============================
 */

export const accounts = sqliteTable('accounts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
})

// Sessions
export const sessions = sqliteTable('sessions', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
})

// Verification Tokens
export const verificationTokens = sqliteTable('verificationTokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
})

// Type exports for inference
export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert

export type Article = typeof articles.$inferSelect
export type InsertArticle = typeof articles.$inferInsert

export type Category = typeof categories.$inferSelect
export type InsertCategory = typeof categories.$inferInsert
