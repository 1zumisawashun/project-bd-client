import { VStack } from '@/components/layouts/VStack'
import { useArrayState } from '@/functions/hooks/useArrayState'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Card, CardBody } from '../../elements/Card'
import { Form, FormErrorMessage, FormField } from '../Form'
import { groupItems, statusItems } from '../forms.constant'
import { Checkbox, CheckboxGroup } from './index'

const meta: Meta<typeof Checkbox> = {
  title: 'form/Checkbox',
  component: Checkbox,
}
export default meta
type Story = StoryObj<typeof Checkbox>

const CheckboxStatusListRender: React.FC = () => {
  return (
    <VStack>
      {statusItems.map((d) => (
        <Card key={d.value}>
          <CardBody>
            <CheckboxGroup>
              <Checkbox {...d}>default</Checkbox>
              <Checkbox {...d} id="hover">
                hover
              </Checkbox>
              <Checkbox {...d} id="focus">
                focus
              </Checkbox>
              <Checkbox {...d} disabled>
                disabled
              </Checkbox>
            </CheckboxGroup>
          </CardBody>
        </Card>
      ))}
    </VStack>
  )
}

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
          render={({ field: { onChange, value: _value, ...props } }) => (
            <CheckboxGroup>
              {groupItems.map((d) => (
                <Checkbox
                  key={d.value}
                  {...props}
                  // NOTE: RadixUIのcheckboxはbuttonで作られているのでonClickでイベントを発火する
                  onClick={() => {
                    const checked = state.includes(d.value)
                    onChange(checked ? remove(d.value) : add(d.value))
                  }}
                  checked={state.includes(d.value)}
                  error={!!errors.checkbox}
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
              error={!!errors.checkbox}
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

export const CheckboxStatusList: Story = {
  args: {},
  render: () => <CheckboxStatusListRender />,
}

export const CheckboxGroupControlled: Story = {
  args: {},
  render: () => <CheckboxGroupControlledRender />,
}

export const CheckboxGroupUncontrolled = {
  args: {},
  render: () => (
    <CheckboxGroup>
      {groupItems.map((d) => (
        <Checkbox key={d.value} value={d.value}>
          {d.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  ),
}

export const CheckboxControlled: Story = {
  args: {},
  render: () => <CheckboxControlledRender />,
}

export const CheckboxUncontrolled = {
  args: {},
  render: () => <Checkbox>checkbox</Checkbox>,
}
