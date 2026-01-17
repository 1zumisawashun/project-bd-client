import '@/assets/global.css'
import '@/assets/the-new-css-reset.css'
import type { Preview } from '@storybook/react'
import {
  ProviderDecorator,
  SpWidthDecorator,
} from '../app/functions/libs/storybook/decorators'

/** @see https://stackoverflow.com/questions/76933793/how-to-write-decorator-in-typescript-for-storybook */

const preview: Preview = {
  decorators: [ProviderDecorator, SpWidthDecorator],
  parameters: {
    pseudo: {
      hover: '#hover',
      active: '#active',
      focusVisible: '#focus-visible',
      focus: '#focus',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/board/eslbvJyXd5j6vRXNF7ZFVV/Welcome-to-FigJam?node-id=0-1&node-type=CANVAS&t=N0PqZCAdPjIsDLZv-0',
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
