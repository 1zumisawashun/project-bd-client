import { Prisma } from '@prisma/client'

export const categories: Prisma.CategoryCreateInput[] = [
  { name: 'テクノロジー' }, // (テクノロジー)
  { name: 'ファッション' }, // (ファッション)
  { name: '食品と飲料' }, // (食品と飲料)
  { name: '健康とウェルネス' }, // (健康とウェルネス)
  { name: 'スポーツ' }, // (スポーツ)
  { name: 'エンターテイメント' }, // (エンターテイメント)
  { name: '旅行' }, // (旅行)
  { name: '教育' }, // (教育)
  { name: '自動車' }, // (自動車)
  { name: '家庭とガーデニング' }, // (家庭とガーデニング)
]
