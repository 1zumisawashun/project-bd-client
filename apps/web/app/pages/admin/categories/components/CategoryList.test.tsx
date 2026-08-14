import { render, screen } from '@testing-library/react'
import { CategoryList } from './CategoryList'

describe('CategoryList', () => {
  const mockCategories = [
    {
      id: '1',
      name: 'Technology',
      createdAt: new Date('2026-02-03T10:00:00'),
    },
    {
      id: '2',
      name: 'Design',
      createdAt: new Date('2026-02-02T10:00:00'),
    },
  ]

  describe('when categories exist', () => {
    it('should render category names', () => {
      render(<CategoryList categories={mockCategories} />)

      expect(screen.getByText('Technology')).toBeInTheDocument()
      expect(screen.getByText('Design')).toBeInTheDocument()
    })

    it('should render category creation dates', () => {
      render(<CategoryList categories={mockCategories} />)

      const dates = screen.getAllByText(/2026/)
      expect(dates).toHaveLength(2)
    })

    it('should render correct number of categories', () => {
      render(<CategoryList categories={mockCategories} />)

      const listItems = screen.getAllByRole('listitem')
      expect(listItems).toHaveLength(2)
    })
  })

  describe('when no categories exist', () => {
    it('should render empty state message', () => {
      render(<CategoryList categories={[]} />)

      expect(
        screen.getByText('カテゴリーがまだ作成されていません'),
      ).toBeInTheDocument()
    })

    it('should not render list when empty', () => {
      render(<CategoryList categories={[]} />)

      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })
})
