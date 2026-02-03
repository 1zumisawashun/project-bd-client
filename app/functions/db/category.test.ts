import db from '@/functions/libs/drizzle/client'
import { categories } from '@/functions/libs/drizzle/schema'
import { getCategories } from './category'

// Mock the database
jest.mock('@/functions/libs/drizzle/client', () => ({
  __esModule: true,
  default: {
    select: jest.fn(),
    query: {
      categories: {
        findFirst: jest.fn(),
      },
    },
    insert: jest.fn(),
  },
}))

describe('getCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return all categories with id, name, and createdAt', async () => {
    const mockCategories = [
      { id: '1', name: 'Technology', createdAt: new Date('2026-02-03') },
      { id: '2', name: 'Design', createdAt: new Date('2026-02-02') },
    ]

    const mockFrom = jest.fn().mockReturnValue({
      orderBy: jest.fn().mockResolvedValue(mockCategories),
    })
    const mockSelect = jest.fn().mockReturnValue({ from: mockFrom })
    ;(db.select as jest.Mock).mockImplementation(mockSelect)

    const result = await getCategories()

    expect(result).toEqual(mockCategories)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(db.select).toHaveBeenCalledWith({
      id: categories.id,
      name: categories.name,
      createdAt: categories.createdAt,
    })
  })

  it('should order categories by createdAt in descending order', async () => {
    const mockCategories = [
      { id: '1', name: 'Technology', createdAt: new Date('2026-02-03') },
      { id: '2', name: 'Design', createdAt: new Date('2026-02-02') },
    ]

    const mockOrderBy = jest.fn().mockResolvedValue(mockCategories)
    const mockFrom = jest.fn().mockReturnValue({ orderBy: mockOrderBy })
    const mockSelect = jest.fn().mockReturnValue({ from: mockFrom })
    ;(db.select as jest.Mock).mockImplementation(mockSelect)

    await getCategories()

    expect(mockOrderBy).toHaveBeenCalled()
  })

  it('should return null when no categories exist', async () => {
    const mockOrderBy = jest.fn().mockResolvedValue([])
    const mockFrom = jest.fn().mockReturnValue({ orderBy: mockOrderBy })
    const mockSelect = jest.fn().mockReturnValue({ from: mockFrom })
    ;(db.select as jest.Mock).mockImplementation(mockSelect)

    const result = await getCategories()

    expect(result).toEqual([])
  })

  it('should throw error when database query fails', async () => {
    const mockFrom = jest.fn().mockReturnValue({
      orderBy: jest.fn().mockRejectedValue(new Error('DB Error')),
    })
    const mockSelect = jest.fn().mockReturnValue({ from: mockFrom })
    ;(db.select as jest.Mock).mockImplementation(mockSelect)

    await expect(getCategories()).rejects.toThrow('Failed to get categories')
  })
})
