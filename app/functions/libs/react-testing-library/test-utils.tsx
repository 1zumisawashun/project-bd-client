/* eslint-disable import/export */
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { PropsWithChildren, ReactElement } from 'react'

/** @description renderに必要なProviderはここでまとめて提供する */
function AllTheProviders({ children }: PropsWithChildren) {
  /**
   * @description next/linkのモックを提供する
   * @see https://www.npmjs.com/package/next-router-mock
   */
  return <MemoryRouterProvider>{children}</MemoryRouterProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
