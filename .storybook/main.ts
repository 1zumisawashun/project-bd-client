import type { StorybookConfig } from '@storybook/nextjs'

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
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
}
export default config
