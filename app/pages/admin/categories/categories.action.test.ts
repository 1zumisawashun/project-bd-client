import { type Session } from 'next-auth'
import { type Category } from '@/functions/libs/drizzle/schema'

// Mock dependencies - must be before imports
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

jest.mock('@/functions/libs/next-auth/session', () => ({
  getSession: jest.fn(),
}))

jest.mock('@/functions/db/category', () => ({
  getCategoryByName: jest.fn(),
  createCategory: jest.fn(),
}))

import { revalidatePath } from 'next/cache'
import { createCategory, getCategoryByName } from '@/functions/db/category'
import { getSession } from '@/functions/libs/next-auth/session'
import { createCategoryAction } from './categories.action'

const mockRevalidatePath = revalidatePath as jest.MockedFunction<
  typeof revalidatePath
>

const mockGetSession = getSession as unknown as jest.MockedFunction<
  () => Promise<Session | null>
>
const mockGetCategoryByName = getCategoryByName as jest.MockedFunction<
  () => Promise<Category | null>
>
const mockCreateCategory = createCategory as jest.MockedFunction<
  () => Promise<Category | null>
>

describe('createCategoryAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('authorization', () => {
    it('should return error when user is not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const result = await createCategoryAction({ name: 'Test Category' })

      expect(result.isSuccess).toBe(false)
      if (!result.isSuccess) {
        expect(result.error.message).toContain('ログイン')
      }
    })

    it('should return error when user is not admin', async () => {
      mockGetSession.mockResolvedValue({
        user: { id: '1', email: 'user@test.com', role: 'USER' },
        expires: '',
      })

      const result = await createCategoryAction({ name: 'Test Category' })

      expect(result.isSuccess).toBe(false)
      if (!result.isSuccess) {
        expect(result.error.message).toContain('管理者')
      }
    })
  })

  describe('duplicate check', () => {
    it('should return error when category name already exists', async () => {
      mockGetSession.mockResolvedValue({
        user: { id: '1', email: 'admin@test.com', role: 'ADMIN' },
        expires: '',
      })
      mockGetCategoryByName.mockResolvedValue({
        id: 'existing-id',
        name: 'Existing Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const result = await createCategoryAction({ name: 'Existing Category' })

      expect(result.isSuccess).toBe(false)
      if (!result.isSuccess) {
        expect(result.error.message).toContain('既に存在')
      }
    })
  })

  describe('category creation', () => {
    it('should create category and return success when valid', async () => {
      mockGetSession.mockResolvedValue({
        user: { id: '1', email: 'admin@test.com', role: 'ADMIN' },
        expires: '',
      })
      mockGetCategoryByName.mockResolvedValue(null)
      mockCreateCategory.mockResolvedValue({
        id: 'new-id',
        name: 'New Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const result = await createCategoryAction({ name: 'New Category' })

      expect(result.isSuccess).toBe(true)
      if (result.isSuccess) {
        expect(result.data).toEqual({
          id: 'new-id',
          name: 'New Category',
        })
      }
      expect(mockCreateCategory).toHaveBeenCalledWith({ name: 'New Category' })
      expect(mockRevalidatePath).toHaveBeenCalledWith('/admin/categories')
    })

    it('should return error when category creation fails', async () => {
      mockGetSession.mockResolvedValue({
        user: { id: '1', email: 'admin@test.com', role: 'ADMIN' },
        expires: '',
      })
      mockGetCategoryByName.mockResolvedValue(null)
      mockCreateCategory.mockResolvedValue(null)

      const result = await createCategoryAction({ name: 'New Category' })

      expect(result.isSuccess).toBe(false)
      if (!result.isSuccess) {
        expect(result.error.message).toContain('作成に失敗')
      }
    })

    it('should return error when database throws exception', async () => {
      mockGetSession.mockResolvedValue({
        user: { id: '1', email: 'admin@test.com', role: 'ADMIN' },
        expires: '',
      })
      mockGetCategoryByName.mockResolvedValue(null)
      mockCreateCategory.mockRejectedValue(new Error('Database error'))

      const result = await createCategoryAction({ name: 'New Category' })

      expect(result.isSuccess).toBe(false)
    })
  })
})
