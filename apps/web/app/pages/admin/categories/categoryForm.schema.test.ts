import { categoryFormSchema } from './categoryForm.schema'

describe('categoryFormSchema', () => {
  describe('name validation', () => {
    it('should pass with valid category name', () => {
      const result = categoryFormSchema.safeParse({ name: 'Technology' })
      expect(result.success).toBe(true)
    })

    it('should fail when name is empty', () => {
      const result = categoryFormSchema.safeParse({ name: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]!.message).toBe('カテゴリー名は必須です')
      }
    })

    it('should fail when name is only whitespace', () => {
      const result = categoryFormSchema.safeParse({ name: '   ' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]!.message).toBe('カテゴリー名は必須です')
      }
    })

    it('should pass with exactly 100 characters', () => {
      const name = 'a'.repeat(100)
      const result = categoryFormSchema.safeParse({ name })
      expect(result.success).toBe(true)
    })

    it('should fail when name exceeds 100 characters', () => {
      const name = 'a'.repeat(101)
      const result = categoryFormSchema.safeParse({ name })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]!.message).toBe(
          'カテゴリー名は100文字以内で入力してください',
        )
      }
    })

    it('should trim whitespace from name', () => {
      const result = categoryFormSchema.safeParse({ name: '  Technology  ' })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('Technology')
      }
    })
  })
})
