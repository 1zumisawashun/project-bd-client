/**
 * Integration tests for admin category management feature
 * These tests verify the interaction between components
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AdminCategoriesPage } from './AdminCategoriesPage'

// Mock next/navigation
const mockRefresh = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}))

// Mock next/cache
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

// Mock server action
jest.mock('./categories.action', () => ({
  createCategoryAction: jest.fn(),
}))

import { createCategoryAction } from './categories.action'

const mockCreateCategoryAction = createCategoryAction as jest.MockedFunction<
  typeof createCategoryAction
>

describe('Admin Category Management Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('カテゴリー作成フロー', () => {
    it('管理者としてカテゴリーを作成できる', async () => {
      mockCreateCategoryAction.mockResolvedValue({
        isSuccess: true,
        data: { id: 'new-id', name: 'Technology' },
        message: '成功しました',
      })

      const user = userEvent.setup()
      render(<AdminCategoriesPage categories={[]} />)

      // フォームに入力
      await user.type(
        screen.getByLabelText('カテゴリー名', { exact: false }),
        'Technology',
      )

      // 送信
      await user.click(screen.getByRole('button', { name: '作成' }))

      // Server Actionが呼ばれる
      await waitFor(() => {
        expect(mockCreateCategoryAction).toHaveBeenCalledWith({
          name: 'Technology',
        })
      })

      // ページがリフレッシュされる
      await waitFor(() => {
        expect(mockRefresh).toHaveBeenCalled()
      })
    })

    it('バリデーションエラーが正しく表示される', async () => {
      const user = userEvent.setup()
      render(<AdminCategoriesPage categories={[]} />)

      // 空のまま送信
      await user.click(screen.getByRole('button', { name: '作成' }))

      // バリデーションエラーが表示される
      await waitFor(() => {
        expect(screen.getByText('カテゴリー名は必須です')).toBeInTheDocument()
      })

      // Server Actionは呼ばれない
      expect(mockCreateCategoryAction).not.toHaveBeenCalled()
    })

    it('重複カテゴリー名でエラーが表示される', async () => {
      mockCreateCategoryAction.mockResolvedValue({
        isSuccess: false,
        data: null,
        error: { message: 'このカテゴリー名は既に存在します' },
      })

      const user = userEvent.setup()
      render(
        <AdminCategoriesPage
          categories={[{ id: '1', name: 'Existing', createdAt: new Date() }]}
        />,
      )

      // 既存のカテゴリー名を入力
      await user.type(
        screen.getByLabelText('カテゴリー名', { exact: false }),
        'Existing',
      )
      await user.click(screen.getByRole('button', { name: '作成' }))

      // エラーメッセージが表示される
      await waitFor(() => {
        expect(
          screen.getByText('このカテゴリー名は既に存在します'),
        ).toBeInTheDocument()
      })
    })
  })

  describe('カテゴリー一覧表示', () => {
    it('既存のカテゴリーが表示される', () => {
      const categories = [
        { id: '1', name: 'Technology', createdAt: new Date('2026-02-03') },
        { id: '2', name: 'Design', createdAt: new Date('2026-02-02') },
      ]

      render(<AdminCategoriesPage categories={categories} />)

      expect(screen.getByText('Technology')).toBeInTheDocument()
      expect(screen.getByText('Design')).toBeInTheDocument()
    })

    it('カテゴリーがない場合は空状態メッセージが表示される', () => {
      render(<AdminCategoriesPage categories={[]} />)

      expect(
        screen.getByText('カテゴリーがまだ作成されていません'),
      ).toBeInTheDocument()
    })
  })

  describe('ローディング状態', () => {
    it('送信中はボタンが無効化される', async () => {
      mockCreateCategoryAction.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  isSuccess: true,
                  data: { id: '1', name: 'Test' },
                  message: '成功しました',
                }),
              100,
            ),
          ),
      )

      const user = userEvent.setup()
      render(<AdminCategoriesPage categories={[]} />)

      await user.type(
        screen.getByLabelText('カテゴリー名', { exact: false }),
        'Test',
      )
      await user.click(screen.getByRole('button', { name: '作成' }))

      // ローディング中はボタンが無効化される
      expect(screen.getByRole('button', { name: '作成中...' })).toBeDisabled()
    })
  })
})
