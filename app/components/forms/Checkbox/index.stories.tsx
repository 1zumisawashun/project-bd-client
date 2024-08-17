import type { Meta, StoryObj } from '@storybook/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useArrayState } from '@/functions/hooks/useArrayState'
import { items } from '../forms.constant'
import { Checkbox, CheckboxGroup } from './index'
import { FormErrorMessage, FormField, Form } from '../Form'

const meta: Meta<typeof Checkbox> = {
  title: 'form/Checkbox',
  component: Checkbox,
}
export default meta
type Story = StoryObj<typeof Checkbox>

const CheckboxGroupControlledRender: React.FC = () => {
  const schema = z.object({
    checkbox: z.string().array(),
  })

  const {
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      checkbox: [],
    },
  })

  const [state, { add, remove }] = useArrayState<string>()

  return (
    <Form>
      <FormField name="checkbox" serverInvalid={!!errors.checkbox}>
        <Controller
          control={control}
          name="checkbox"
          render={({ field: { onChange, value, ...props } }) => (
            <CheckboxGroup>
              {items.map((d) => (
                <Checkbox
                  key={d.value}
                  {...props}
                  // NOTE: RadixUIのcheckboxはbuttonで作られているのでonClickでイベントを発火する
                  onClick={() => {
                    const checked = state.includes(d.value)
                    onChange(checked ? remove(d.value) : add(d.value))
                  }}
                  checked={state.includes(d.value)}
                >
                  {d.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
          )}
        />
        <FormErrorMessage>{errors.checkbox?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}

const CheckboxGroupUncontrolledRender: React.FC = () => {
  return (
    <CheckboxGroup>
      {items.map((d) => (
        <Checkbox key={d.value} value={d.value}>
          {d.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  )
}

const CheckboxControlledRender: React.FC = () => {
  const schema = z.object({
    checkbox: z.boolean(),
  })

  const {
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      checkbox: false,
    },
  })

  return (
    <Form>
      <FormField name="checkbox" serverInvalid={!!errors.checkbox}>
        <Controller
          control={control}
          name="checkbox"
          render={({ field: { onChange, value, ...props } }) => (
            <Checkbox
              {...props}
              checked={value}
              onCheckedChange={(checked) => onChange(checked)}
            >
              checkbox
            </Checkbox>
          )}
        />
        <FormErrorMessage>{errors.checkbox?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}

const CheckboxUncontrolledRender: React.FC = () => {
  return <Checkbox>checkbox</Checkbox>
}

export const CheckboxGroupControlled: Story = {
  args: {},
  render: () => <CheckboxGroupControlledRender />,
}

export const CheckboxGroupUncontrolled = {
  args: {},
  render: () => <CheckboxGroupUncontrolledRender />,
}

export const CheckboxControlled: Story = {
  args: {},
  render: () => <CheckboxControlledRender />,
}

export const CheckboxUncontrolled = {
  args: {},
  render: () => <CheckboxUncontrolledRender />,
}
