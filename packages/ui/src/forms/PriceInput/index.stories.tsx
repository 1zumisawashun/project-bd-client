'use client'

import { useLens } from '@hookform/lenses'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { PriceInput } from './index'

const meta: Meta<typeof PriceInput> = {
  title: 'form/PriceInput',
  component: PriceInput,
}

export default meta

type Story = StoryObj<typeof PriceInput>

const schema = z.object({
  price: z.number().max(10000, 'Price must be less than 10000'),
})

const Render: FC = () => {
  const { control } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      price: 1000,
    },
  })

  const lens = useLens({ control })

  return <PriceInput lens={lens} />
}

export const Default: Story = {
  render: () => <Render />,
}
