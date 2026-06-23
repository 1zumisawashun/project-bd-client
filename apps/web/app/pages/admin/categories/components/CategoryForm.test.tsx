import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryForm } from './CategoryForm'

// Mock the server action
jest.mock('../categories.action', () => ({
  createCategoryAction: jest.fn(),
}))

import { createCategoryAction } from '../categories.action'

const mockCreateCategoryAction = createCategoryAction as jest.MockedFunction<
  typeof createCategoryAction
>

describe('CategoryForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    it('should render category name input field', () => {
      render(<CategoryForm />)

      expect(
        screen.getByLabelText('カテゴリー名', { exact: false }),
      ).toBeInTheDocument()
    })

    it('should render submit button', () => {
      render(<CategoryForm />)

      expect(screen.getByRole('button', { name: '作成' })).toBeInTheDocument()
    })
  })

  describe('validation', () => {
    it('should show error when submitting empty name', async () => {
      const user = userEvent.setup()
      render(<CategoryForm />)

      // Focus and blur to trigger validation
      const input = screen.getByLabelText('カテゴリー名', { exact: false })
      await user.clear(input)
      await user.click(screen.getByRole('button', { name: '作成' }))

      await waitFor(() => {
        expect(screen.getByText('カテゴリー名は必須です')).toBeInTheDocument()
      })

      // Server action should not be called for invalid form
      expect(mockCreateCategoryAction).not.toHaveBeenCalled()
    })
  })

  describe('submission', () => {
    it('should call createCategoryAction with form values', async () => {
      mockCreateCategoryAction.mockResolvedValue({
        isSuccess: true,
        data: { id: '1', name: 'New Category' },
        message: '成功しました',
      })

      const user = userEvent.setup()
      render(<CategoryForm />)

      await user.type(
        screen.getByLabelText('カテゴリー名', { exact: false }),
        'New Category',
      )
      await user.click(screen.getByRole('button', { name: '作成' }))

      await waitFor(() => {
        expect(mockCreateCategoryAction).toHaveBeenCalledWith({
          name: 'New Category',
        })
      })
    })

    it('should disable submit button while submitting', async () => {
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
      render(<CategoryForm />)

      await user.type(
        screen.getByLabelText('カテゴリー名', { exact: false }),
        'Test',
      )
      await user.click(screen.getByRole('button', { name: '作成' }))

      expect(screen.getByRole('button', { name: '作成中...' })).toBeDisabled()
    })

    it('should call onSuccess callback after successful submission', async () => {
      mockCreateCategoryAction.mockResolvedValue({
        isSuccess: true,
        data: { id: '1', name: 'New Category' },
        message: '成功しました',
      })

      const onSuccess = jest.fn()
      const user = userEvent.setup()
      render(<CategoryForm onSuccess={onSuccess} />)

      await user.type(
        screen.getByLabelText('カテゴリー名', { exact: false }),
        'New Category',
      )
      await user.click(screen.getByRole('button', { name: '作成' }))

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled()
      })
    })

    it('should show error message when submission fails', async () => {
      mockCreateCategoryAction.mockResolvedValue({
        isSuccess: false,
        data: null,
        error: { message: 'このカテゴリー名は既に存在します' },
      })

      const user = userEvent.setup()
      render(<CategoryForm />)

      await user.type(
        screen.getByLabelText('カテゴリー名', { exact: false }),
        'Existing',
      )
      await user.click(screen.getByRole('button', { name: '作成' }))

      await waitFor(() => {
        expect(
          screen.getByText('このカテゴリー名は既に存在します'),
        ).toBeInTheDocument()
      })
    })
  })
})
