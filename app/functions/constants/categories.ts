import { categories } from '@/../../drizzle/schema'
import { Categories } from '@/functions/types'

export const mockCategories = [
  {
    id: 'cm07vrx4y00002vwkx0koma0j',
    name: 'テクノロジー',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: 'cm07vrx4y00002vwkx0koma0k',
    name: 'ファッション',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: 'cm07vrx4y00002vwkx0koma0l',
    name: '食品と飲料',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: 'cm07vrx4y00002vwkx0koma0m',
    name: '健康とウェルネス',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: 'cm07vrx4y00002vwkx0koma0n',
    name: 'スポーツ',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: 'cm07vrx4y00002vwkx0koma0o',
    name: 'エンターテイメント',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: 'cm07vrx4y00002vwkx0koma0p',
    name: '旅行',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: 'cm07vrx4y00002vwkx0koma0q',
    name: '教育',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: 'cm07vrx4y00002vwkx0koma0r',
    name: '自動車',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: 'cm07vrx4y00002vwkx0koma0s',
    name: '家庭とガーデニング',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
] satisfies Categories

export const prismaCategories: (typeof categories.$inferInsert)[] =
  mockCategories.map((d) => ({ id: d.id, name: d.name }))

// Contains AI-generated edits.
