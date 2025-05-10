import type { Config, PARAM_KEY } from '@storybook/addon-designs'
import type { NextJsParameters } from '@storybook/nextjs'
import type { StorybookParameters } from '@storybook/types'

// v9でNextJsParametersとStorybookParametersが追加される
declare module '@storybook/react' {
  interface Parameters extends NextJsParameters, StorybookParameters {
    [PARAM_KEY]?: Config
  }
}
