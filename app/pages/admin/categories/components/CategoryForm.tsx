'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/buttons/Button'
import { Field } from '@/components/forms/Field/components/Field'
import { FieldLabel } from '@/components/forms/Field/components/FieldLabel'
import { TextInput } from '@/components/forms/TextInput'
import { createCategoryAction } from '../categories.action'
import { categoryFormSchema, CategoryFormValues } from '../categoryForm.schema'

type CategoryFormProps = {
  onSuccess?: () => void
}

export function CategoryForm({ onSuccess }: CategoryFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: CategoryFormValues) => {
    setServerError(null)

    const result = await createCategoryAction(data)

    if (!result.isSuccess) {
      setServerError(result.error.message)
      return
    }

    reset()
    onSuccess?.()
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel>カテゴリー名</FieldLabel>
        <TextInput {...register('name')} placeholder="カテゴリー名を入力" />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </Field>

      {serverError && (
        <p className="text-red-500 text-sm mt-2">{serverError}</p>
      )}

      <div className="mt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '作成中...' : '作成'}
        </Button>
      </div>
    </form>
  )
}
