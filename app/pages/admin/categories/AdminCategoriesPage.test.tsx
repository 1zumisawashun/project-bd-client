import { render, screen } from '@testing-library/react'
import { AdminCategoriesPage } from './AdminCategoriesPage'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}))

// Mock child components
jest.mock('./components/CategoryForm', () => ({
  CategoryForm: ({ onSuccess }: { onSuccess?: () => void }) => (
    <div data-testid="category-form">
      <button onClick={onSuccess}>Mock Form</button>
    </div>
  ),
}))

jest.mock('./components/CategoryList', () => ({
  CategoryList: ({ categories }: { categories: unknown[] }) => (
    <div data-testid="category-list">{categories.length} categories</div>
  ),
}))

describe('AdminCategoriesPage', () => {
  const mockCategories = [
    { id: '1', name: 'Tech', createdAt: new Date() },
    { id: '2', name: 'Design', createdAt: new Date() },
  ]

  it('should render page title', () => {
    render(<AdminCategoriesPage categories={mockCategories} />)

    expect(screen.getByText('カテゴリー管理')).toBeInTheDocument()
  })

  it('should render section headings', () => {
    render(<AdminCategoriesPage categories={mockCategories} />)

    expect(screen.getByText('カテゴリーを追加')).toBeInTheDocument()
    expect(screen.getByText('カテゴリー一覧')).toBeInTheDocument()
  })

  it('should render CategoryForm component', () => {
    render(<AdminCategoriesPage categories={mockCategories} />)

    expect(screen.getByTestId('category-form')).toBeInTheDocument()
  })

  it('should render CategoryList component with categories', () => {
    render(<AdminCategoriesPage categories={mockCategories} />)

    expect(screen.getByTestId('category-list')).toBeInTheDocument()
    expect(screen.getByText('2 categories')).toBeInTheDocument()
  })

  it('should pass empty array when no categories', () => {
    render(<AdminCategoriesPage categories={[]} />)

    expect(screen.getByText('0 categories')).toBeInTheDocument()
  })
})
