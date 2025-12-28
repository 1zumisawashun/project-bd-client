import { VStack } from '@/components/layouts/VStack'
import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardBody } from '../../elements/Card'
import { Field } from '../Field'
import { Fieldset, FieldsetLegend } from '../Fieldset'

import { useArrayState } from '@/functions/hooks/useArrayState'
import { FC, useState } from 'react'
import { Checkbox, CheckboxGroup } from './index'

const options = [
  { value: 'http', label: 'HTTP' },
  { value: 'https', label: 'HTTPS' },
  { value: 'ssh', label: 'SSH' },
]

const meta: Meta<typeof Checkbox> = {
  title: 'form/Checkbox',
  component: Checkbox,
}

export default meta

type Story = StoryObj<typeof Checkbox>

const State: FC = () => {
  return (
    <Field>
      <Fieldset render={<CheckboxGroup />}>
        <FieldsetLegend>Checkbox State</FieldsetLegend>
        <Checkbox checked={true}>checked</Checkbox>
        <Checkbox checked={false}>unchecked</Checkbox>
        <Checkbox error>error</Checkbox>
        <Checkbox checked={false} disabled>
          disabled
        </Checkbox>
      </Fieldset>
    </Field>
  )
}

const Multiple: FC = () => {
  const [state, { add, remove }] = useArrayState<string>(['http'])
  return (
    <Field>
      <Fieldset render={<CheckboxGroup />}>
        <FieldsetLegend>Checkbox Multiple</FieldsetLegend>
        {options.map(({ value, label }) => (
          <Checkbox
            onClick={() => {
              const checked = state.includes(value)
              if (checked) {
                remove(value)
              } else {
                add(value)
              }
            }}
            checked={state.includes(value)}
            key={value}
          >
            {label}
          </Checkbox>
        ))}
      </Fieldset>
    </Field>
  )
}

const Single: FC = () => {
  const [checked, setChecked] = useState(true)
  return (
    <Field>
      <Checkbox checked={checked} onClick={() => setChecked(!checked)}>
        Checkbox Single
      </Checkbox>
    </Field>
  )
}

const Render: FC = () => {
  return (
    <VStack>
      <Card>
        <CardBody>
          <State></State>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Multiple></Multiple>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Single></Single>
        </CardBody>
      </Card>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
