import type { StorybookConfig } from '@storybook/nextjs'
const path = require('path')

// @ts-check
/**
 * @type { import("@storybook/react/types").StorybookConfig}
 */
const config: StorybookConfig = {
  stories: ['../app/**/*.mdx', '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    'storybook-addon-pseudo-states',
    '@storybook/addon-designs',
  ],
  /**
   * @see https://github.com/storybookjs/storybook/issues/3916#issuecomment-871283551
   * @see https://github.com/storybookjs/storybook/discussions/25470
   */
  webpackFinal(config: any) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../app'),
    }
    return config
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
}
export default config
