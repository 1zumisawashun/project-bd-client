import { relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  index,
  primaryKey,
  integer,
} from 'drizzle-orm/pg-core'

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey().notNull(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  hashedPassword: text('hashedPassword'),
  role: text('role'),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
})

// NextAuth tables for OAuth
export const accounts = pgTable(
  'accounts',
  {
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
  },
  (table) => ({
    pk: primaryKey({ columns: [table.provider, table.providerAccountId] }),
  }),
)

export const sessions = pgTable('sessions', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verificationTokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.identifier, table.token] }),
  }),
)

// Articles table
export const articles = pgTable(
  'articles',
  {
    id: text('id').primaryKey().notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    status: text('status').notNull(),
    authorId: text('authorId').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    authorIdIdx: index('articles_authorId_idx').on(table.authorId),
  }),
)

// Categories table
export const categories = pgTable('categories', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
})

// Join table for Article-Category many-to-many relationship
export const articlesToCategories = pgTable(
  'articles_to_categories',
  {
    articleId: text('articleId')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
    categoryId: text('categoryId')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.articleId, table.categoryId] }),
  }),
)

// Join table for User-Article liked relationship
export const usersToLikedArticles = pgTable(
  'users_to_liked_articles',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    articleId: text('articleId')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.articleId] }),
  }),
)

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(articles),
  likedArticles: many(usersToLikedArticles),
  accounts: many(accounts),
  sessions: many(sessions),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const articlesRelations = relations(articles, ({ one, many }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
  categories: many(articlesToCategories),
  likedUsers: many(usersToLikedArticles),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  articles: many(articlesToCategories),
}))

export const articlesToCategoriesRelations = relations(
  articlesToCategories,
  ({ one }) => ({
    article: one(articles, {
      fields: [articlesToCategories.articleId],
      references: [articles.id],
    }),
    category: one(categories, {
      fields: [articlesToCategories.categoryId],
      references: [categories.id],
    }),
  }),
)

export const usersToLikedArticlesRelations = relations(
  usersToLikedArticles,
  ({ one }) => ({
    user: one(users, {
      fields: [usersToLikedArticles.userId],
      references: [users.id],
    }),
    article: one(articles, {
      fields: [usersToLikedArticles.articleId],
      references: [articles.id],
    }),
  }),
)

// Types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Article = typeof articles.$inferSelect
export type NewArticle = typeof articles.$inferInsert
export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
export type Account = typeof accounts.$inferSelect
export type Session = typeof sessions.$inferSelect
export type VerificationToken = typeof verificationTokens.$inferSelect
