import { VStack } from '@/components/layouts/VStack'
import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardBody } from '../../elements/Card'

import { Field } from '../Field'
import { Fieldset, FieldsetLegend } from '../Fieldset'

import { FC, useState } from 'react'
import { Radio, RadioGroup } from './index'

const options = [
  { value: 'http', label: 'HTTP' },
  { value: 'https', label: 'HTTPS' },
  { value: 'ssh', label: 'SSH' },
]

const meta: Meta<typeof Radio> = {
  title: 'form/Radio',
  component: Radio,
}

export default meta

type Story = StoryObj<typeof Radio>

const State: FC = () => {
  return (
    <Field>
      <Fieldset render={<RadioGroup defaultValue="checked" />}>
        <FieldsetLegend>Radio State</FieldsetLegend>
        <Radio value="checked">checked</Radio>
        <Radio value="unchecked">unchecked</Radio>
        <Radio value="error" error>
          error
        </Radio>
        <Radio value="disabled" disabled>
          disabled
        </Radio>
      </Fieldset>
    </Field>
  )
}

const Multiple: FC = () => {
  const [value, setValue] = useState('http')

  return (
    <Field>
      <Fieldset
        render={
          <RadioGroup
            value={value}
            onValueChange={(value) => setValue(value as string)}
          />
        }
      >
        <FieldsetLegend>Radio Multiple</FieldsetLegend>
        {options.map(({ value, label }) => (
          <Radio value={value} key={value}>
            {label}
          </Radio>
        ))}
      </Fieldset>
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
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
