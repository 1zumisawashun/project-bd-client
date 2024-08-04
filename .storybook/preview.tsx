import '@/assets/the-new-css-reset.css'
import type { Preview } from '@storybook/react'

/** @see https://stackoverflow.com/questions/76933793/how-to-write-decorator-in-typescript-for-storybook */
import React from 'react'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ width: '576px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    pseudo: {
      hover: '#hover',
      active: '#active',
      focusVisible: '#focus-visible',
    },
    nextjs: {
      /**
       * next/navigationを有効にする場合下記のセットアップが必要になる
       * @see https://storybook.js.org/docs/get-started/nextjs#set-nextjsappdirectory-to-true
       */
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
