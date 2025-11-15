import { render, screen } from '@/functions/libs/react-testing-library/test-utils'
import { createRef } from 'react'
import { Button } from './index'

describe('Button', () => {
  describe('Basic rendering', () => {
    it('renders button with children text', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button', { name: 'Click me' })
      
      expect(button).toBeInTheDocument()
    })

    it('renders with default type as button', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('type', 'button')
    })
  })

  describe('Type prop', () => {
    it('renders with type submit', () => {
      render(<Button type="submit">Submit</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('renders with type reset', () => {
      render(<Button type="reset">Reset</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('type', 'reset')
    })
  })

  describe('Theme prop', () => {
    it('renders with primary theme by default', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('data-theme', 'primary')
    })

    it('renders with danger theme', () => {
      render(<Button theme="danger">Delete</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('data-theme', 'danger')
    })
  })

  describe('Variant prop', () => {
    it('renders with contained variant by default', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('data-variant', 'contained')
    })

    it('renders with outlined variant', () => {
      render(<Button variant="outlined">Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('data-variant', 'outlined')
    })

    it('renders with ghost variant', () => {
      render(<Button variant="ghost">Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('data-variant', 'ghost')
    })
  })

  describe('Shape prop', () => {
    it('renders without shape attribute when not provided', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).not.toHaveAttribute('data-shape')
    })

    it('renders with rounded shape', () => {
      render(<Button shape="rounded">Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('data-shape', 'rounded')
    })

    it('renders with circle shape', () => {
      render(<Button shape="circle">Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('data-shape', 'circle')
    })
  })

  describe('Disabled state', () => {
    it('renders enabled button by default', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).not.toBeDisabled()
    })

    it('renders disabled button when disabled prop is true', () => {
      render(<Button disabled>Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toBeDisabled()
    })
  })

  describe('Prefix and suffix', () => {
    it('renders without prefix and suffix by default', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button.textContent).toBe('Click me')
    })

    it('renders with prefix icon', () => {
      render(
        <Button prefix={<span data-testid="prefix-icon">→</span>}>
          Click me
        </Button>
      )
      
      const prefix = screen.getByTestId('prefix-icon')
      
      expect(prefix).toBeInTheDocument()
      expect(prefix.textContent).toBe('→')
    })

    it('renders with suffix icon', () => {
      render(
        <Button suffix={<span data-testid="suffix-icon">←</span>}>
          Click me
        </Button>
      )
      
      const suffix = screen.getByTestId('suffix-icon')
      
      expect(suffix).toBeInTheDocument()
      expect(suffix.textContent).toBe('←')
    })

    it('renders with both prefix and suffix', () => {
      render(
        <Button
          prefix={<span data-testid="prefix-icon">→</span>}
          suffix={<span data-testid="suffix-icon">←</span>}
        >
          Click me
        </Button>
      )
      
      const prefix = screen.getByTestId('prefix-icon')
      const suffix = screen.getByTestId('suffix-icon')
      
      expect(prefix).toBeInTheDocument()
      expect(suffix).toBeInTheDocument()
    })
  })

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(<Button className="custom-class">Click me</Button>)
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveClass('custom-class')
    })
  })

  describe('Event handlers', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = jest.fn()
      const { user } = render(<Button onClick={handleClick}>Click me</Button>)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const handleClick = jest.fn()
      const { user } = render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>
      )
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('ForwardRef', () => {
    it('forwards ref to button element', () => {
      const ref = createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Click me</Button>)
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Additional props', () => {
    it('passes through additional HTML button attributes', () => {
      render(
        <Button data-testid="test-button" aria-label="Test button">
          Click me
        </Button>
      )
      
      const button = screen.getByTestId('test-button')
      
      expect(button).toHaveAttribute('aria-label', 'Test button')
    })
  })
})
