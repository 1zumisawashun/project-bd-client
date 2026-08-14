import { type Category } from '@/functions/libs/drizzle/schema'

const ID = 'cm07vrx4y00002vwkx0koma0j'

const MOCK_CATEGORY_ONE = {
  id: `MOCK_CATEGORY_ONE_${ID}`,
  name: 'テクノロジー',
  createdAt: new Date('2024-08-31T05:16:36.323Z'),
  updatedAt: new Date('2024-08-31T05:16:36.323Z'),
} satisfies Category

const MOCK_CATEGORY_TWO = {
  id: `MOCK_CATEGORY_TWO_${ID}`,
  name: 'ファッション',
  createdAt: new Date('2024-08-31T05:16:36.323Z'),
  updatedAt: new Date('2024-08-31T05:16:36.323Z'),
} satisfies Category

const MOCK_CATEGORY_THREE = {
  id: `MOCK_CATEGORY_THREE_${ID}`,
  name: '食品と飲料',
  createdAt: new Date('2024-08-31T05:16:36.323Z'),
  updatedAt: new Date('2024-08-31T05:16:36.323Z'),
} satisfies Category

export const MOCK_CATEGORIES = [
  MOCK_CATEGORY_ONE,
  MOCK_CATEGORY_TWO,
  MOCK_CATEGORY_THREE,
] satisfies Category[]
