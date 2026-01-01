import { relations } from 'drizzle-orm'
import {
  pgTable,
  varchar,
  timestamp,
  text,
  primaryKey,
  integer,
} from 'drizzle-orm/pg-core'

// Users table (extended for NextAuth)
export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  hashedPassword: text('hashedPassword'),
  role: varchar('role', { length: 50 }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

// NextAuth Accounts table
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
  (account) => ({
    pk: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  }),
)

// NextAuth Sessions table
export const sessions = pgTable('sessions', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

// NextAuth Verification Tokens table
export const verificationTokens = pgTable(
  'verificationTokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    pk: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

// Articles table
export const articles = pgTable('articles', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  content: text('content').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  authorId: text('authorId')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

// Categories table
export const categories = pgTable('categories', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

// Many-to-many: articles to categories
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
  (t) => ({
    pk: primaryKey({ columns: [t.articleId, t.categoryId] }),
  }),
)

// Many-to-many: liked users to articles
export const likedUsersToArticles = pgTable(
  'liked_users_to_articles',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    articleId: text('articleId')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.articleId] }),
  }),
)

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(articles),
  likedArticles: many(likedUsersToArticles),
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
  likedUsers: many(likedUsersToArticles),
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

export const likedUsersToArticlesRelations = relations(
  likedUsersToArticles,
  ({ one }) => ({
    user: one(users, {
      fields: [likedUsersToArticles.userId],
      references: [users.id],
    }),
    article: one(articles, {
      fields: [likedUsersToArticles.articleId],
      references: [articles.id],
    }),
  }),
)
