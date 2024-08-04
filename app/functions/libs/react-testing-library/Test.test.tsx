import {
  render,
  screen,
  waitFor,
} from '@/functions/libs/react-testing-library/test-utils'
import { mockRouter } from '@/functions/libs/react-testing-library/next-router-utils'
import Page from './Test'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })

  it('navigate if link clicked', async () => {
    const { user } = render(<Page />)
    const link = screen.getByRole('link', { name: 'About' })

    await user.click(link)

    await waitFor(() =>
      expect(mockRouter).toMatchObject({ pathname: '/about' }),
    )
  })
})
