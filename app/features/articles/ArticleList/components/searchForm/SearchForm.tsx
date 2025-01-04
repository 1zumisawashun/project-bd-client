import { Label, LabelAction } from '@/components/elements/Label'
import { AutocompleteInputGroup } from '@/components/forms/AutocompleteInput'
import { Form, FormField } from '@/components/forms/Form'
import { HStack } from '@/components/layouts/HStack'
import { useRouter } from 'next/navigation'
import { useOptimistic } from 'react'

type Props = {
  categoryOptions: string[]
  defaultValues: string[]
}

export const SearchForm: React.FC<Props> = ({
  categoryOptions,
  defaultValues,
}) => {
  const router = useRouter()

  const [categories, setCategories] = useOptimistic<string[]>(defaultValues)

  const options = categoryOptions.filter((d) => !categories.includes(d))

  const remove = (category: string) => {
    const newCategories = categories.filter((d) => d !== category)
    setCategories(newCategories)
    push(newCategories)
  }

  const add = (category: string) => {
    const newCategories = [...categories, category]
    setCategories(newCategories)
    push(newCategories)
  }

  const push = (categories: string[]) => {
    const newParams = new URLSearchParams(
      categories.map((d) => ['category', d]),
    )
    router.push(`?${newParams}`)
  }

  return (
    <Form>
      <FormField name="" style={{ gap: '0.5rem' }}>
        <AutocompleteInputGroup
          options={options}
          value={categories}
          onChange={add}
        />
        {categories?.length > 0 && (
          <HStack gap={2} style={{ flexWrap: 'wrap' }}>
            {categories.map((d) => (
              <Label key={d}>
                {d}
                <LabelAction onClick={() => remove(d)} />
              </Label>
            ))}
          </HStack>
        )}
      </FormField>
    </Form>
  )
}
