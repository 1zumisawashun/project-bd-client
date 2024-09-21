import type { Meta, StoryObj } from '@storybook/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { VStack } from '@/components/layouts/VStack'
import { groupItems, statusItems } from '../forms.constant'
import { RadioGroup, RadioGroupItem } from './index'
import { FormErrorMessage, FormField, Form } from '../Form'
import { Card, CardBody } from '../../elements/Card'

const meta: Meta<typeof RadioGroup> = {
  title: 'form/RadioGroup',
  component: RadioGroup,
}
export default meta
type Story = StoryObj<typeof RadioGroup>

const RadioGroupStatusListRender: React.FC = () => {
  return (
    <VStack>
      {statusItems.map((d) => (
        <Card key={d.value}>
          <CardBody>
            <RadioGroup>
              <RadioGroupItem {...d}>default</RadioGroupItem>
              <RadioGroupItem {...d} id="hover">
                hover
              </RadioGroupItem>
              <RadioGroupItem {...d} id="focus">
                focus
              </RadioGroupItem>
              <RadioGroupItem {...d} disabled>
                disabled
              </RadioGroupItem>
            </RadioGroup>
          </CardBody>
        </Card>
      ))}
    </VStack>
  )
}

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
              {groupItems.map((d) => (
                <RadioGroupItem key={d.value} {...d}>
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
      {groupItems.map((d) => (
        <RadioGroupItem key={d.value} {...d}>
          {d.label}
        </RadioGroupItem>
      ))}
    </RadioGroup>
  )
}

export const RadioGroupStatusList: Story = {
  args: {},
  render: () => <RadioGroupStatusListRender />,
}

export const RadioGroupControlled: Story = {
  args: {},
  render: () => <RadioGroupControlledRender />,
}

export const RadioGroupUncontrolled = {
  args: {},
  render: () => <RadioGroupUncontrolledRender />,
}
