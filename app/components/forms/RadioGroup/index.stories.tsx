import type { Meta, StoryObj } from '@storybook/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { items } from '../forms.constant'
import { RadioGroup, RadioGroupItem } from './index'
import { FormErrorMessage, FormField, Form } from '../Form'

const meta: Meta<typeof RadioGroup> = {
  title: 'form/RadioGroup',
  component: RadioGroup,
}
export default meta
type Story = StoryObj<typeof RadioGroup>

const RadioGroupControlledRender: React.FC = () => {
  const schema = z.object({
    radio: z.string().optional(),
  })

  const {
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      radio: '',
    },
  })

  return (
    <Form>
      <FormField name="radio" serverInvalid={!!errors.radio}>
        <Controller
          control={control}
          name="radio"
          render={({ field: { onChange, ...props } }) => (
            /** @see https://github.com/orgs/react-hook-form/discussions/10246 */
            <RadioGroup {...props} onValueChange={onChange}>
              {items.map((d) => (
                <RadioGroupItem key={d.value} value={d.value}>
                  {d.label}
                </RadioGroupItem>
              ))}
            </RadioGroup>
          )}
        />
        <FormErrorMessage>{errors.radio?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}

const RadioGroupUncontrolledRender: React.FC = () => {
  return (
    <RadioGroup>
      {items.map((d) => (
        <RadioGroupItem key={d.value} value={d.value}>
          {d.label}
        </RadioGroupItem>
      ))}
    </RadioGroup>
  )
}

export const RadioGroupControlled: Story = {
  args: {},
  render: () => <RadioGroupControlledRender />,
}

export const RadioGroupUncontrolled = {
  args: {},
  render: () => <RadioGroupUncontrolledRender />,
}
