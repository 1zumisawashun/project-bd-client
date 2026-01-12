import {
  render,
  screen,
} from '@/functions/libs/react-testing-library/test-utils'
import { AnchorButton } from './index'

describe('AnchorButton', () => {
  describe('基本的な振る舞い', () => {
    it('デフォルトのpropsが設定されている場合、リンクボタンが正しく表示されること', () => {
      // Arrange
      const href = '/test-path'
      const text = 'テストボタン'

      // Act
      render(<AnchorButton href={href}>{text}</AnchorButton>)

      // Assert
      const button = screen.getByRole('button', { name: text })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('href', href)
    })

    it('childrenが設定されている場合、そのテキストが表示されること', () => {
      // Arrange
      const text = 'カスタムテキスト'

      // Act
      render(<AnchorButton href="/test">{text}</AnchorButton>)

      // Assert
      expect(screen.getByRole('button', { name: text })).toBeInTheDocument()
    })
  })

  describe('Props: disabled', () => {
    it('disabled=trueの場合、リンクが無効化されること', () => {
      // Arrange & Act
      render(
        <AnchorButton href="/test" disabled={true}>
          無効なボタン
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: '無効なボタン' })
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('disabled=falseの場合、リンクが有効化されること', () => {
      // Arrange & Act
      render(
        <AnchorButton href="/test" disabled={false}>
          有効なボタン
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: '有効なボタン' })
      expect(button).not.toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Props: theme', () => {
    it('theme="primary"の場合、data-theme属性が設定されること', () => {
      // Arrange & Act
      render(
        <AnchorButton href="/test" theme="primary">
          Primary
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: 'Primary' })
      expect(button).toHaveAttribute('data-theme', 'primary')
    })

    it('theme="secondary"の場合、data-theme属性が設定されること', () => {
      // Arrange & Act
      render(
        <AnchorButton href="/test" theme="secondary">
          Secondary
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: 'Secondary' })
      expect(button).toHaveAttribute('data-theme', 'secondary')
    })
  })

  describe('Props: variant', () => {
    it('variant="contained"の場合、data-variant属性が設定されること', () => {
      // Arrange & Act
      render(
        <AnchorButton href="/test" variant="contained">
          Contained
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: 'Contained' })
      expect(button).toHaveAttribute('data-variant', 'contained')
    })

    it('variant="outlined"の場合、data-variant属性が設定されること', () => {
      // Arrange & Act
      render(
        <AnchorButton href="/test" variant="outlined">
          Outlined
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: 'Outlined' })
      expect(button).toHaveAttribute('data-variant', 'outlined')
    })

    it('variant="ghost"の場合、data-variant属性が設定されること', () => {
      // Arrange & Act
      render(
        <AnchorButton href="/test" variant="ghost">
          Ghost
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: 'Ghost' })
      expect(button).toHaveAttribute('data-variant', 'ghost')
    })
  })

  describe('Props: shape', () => {
    it('shape="rounded"の場合、data-shape属性が設定されること', () => {
      // Arrange & Act
      render(
        <AnchorButton href="/test" shape="rounded">
          Rounded
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: 'Rounded' })
      expect(button).toHaveAttribute('data-shape', 'rounded')
    })

    it('shape="squared"の場合、data-shape属性が設定されること', () => {
      // Arrange & Act
      render(
        <AnchorButton href="/test" shape="squared">
          Squared
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: 'Squared' })
      expect(button).toHaveAttribute('data-shape', 'squared')
    })

    it('shape="circular"の場合、data-shape属性が設定されること', () => {
      // Arrange & Act
      render(
        <AnchorButton href="/test" shape="circular">
          Circular
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: 'Circular' })
      expect(button).toHaveAttribute('data-shape', 'circular')
    })
  })

  describe('Props: prefix', () => {
    it('prefixが設定されている場合、アイコンが表示されること', () => {
      // Arrange
      const prefixText = 'prefix-icon'
      const prefix = <span data-testid="prefix-icon">{prefixText}</span>

      // Act
      render(
        <AnchorButton href="/test" prefix={prefix}>
          テキスト
        </AnchorButton>,
      )

      // Assert
      expect(screen.getByTestId('prefix-icon')).toBeInTheDocument()
      expect(screen.getByTestId('prefix-icon')).toHaveTextContent(prefixText)
    })

    it('prefixが設定されていない場合、何も表示されないこと', () => {
      // Arrange & Act
      render(<AnchorButton href="/test">テキスト</AnchorButton>)

      // Assert
      expect(screen.queryByTestId('prefix-icon')).not.toBeInTheDocument()
    })
  })

  describe('Props: suffix', () => {
    it('suffixが設定されている場合、アイコンが表示されること', () => {
      // Arrange
      const suffixText = 'suffix-icon'
      const suffix = <span data-testid="suffix-icon">{suffixText}</span>

      // Act
      render(
        <AnchorButton href="/test" suffix={suffix}>
          テキスト
        </AnchorButton>,
      )

      // Assert
      expect(screen.getByTestId('suffix-icon')).toBeInTheDocument()
      expect(screen.getByTestId('suffix-icon')).toHaveTextContent(suffixText)
    })

    it('suffixが設定されていない場合、何も表示されないこと', () => {
      // Arrange & Act
      render(<AnchorButton href="/test">テキスト</AnchorButton>)

      // Assert
      expect(screen.queryByTestId('suffix-icon')).not.toBeInTheDocument()
    })
  })

  describe('Props: className', () => {
    it('classNameが設定されている場合、カスタムクラスが適用されること', () => {
      // Arrange
      const customClass = 'custom-class'

      // Act
      render(
        <AnchorButton href="/test" className={customClass}>
          テキスト
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: 'テキスト' })
      expect(button).toHaveClass(customClass)
    })
  })

  describe('Props: href', () => {
    it('hrefが設定されている場合、正しいリンク先が設定されること', () => {
      // Arrange
      const path = '/custom-path'

      // Act
      render(<AnchorButton href={path}>リンク</AnchorButton>)

      // Assert
      const button = screen.getByRole('button', { name: 'リンク' })
      expect(button).toHaveAttribute('href', path)
    })

    it('外部リンクのhrefが設定されている場合、正しいリンク先が設定されること', () => {
      // Arrange
      const externalUrl = 'https://example.com'

      // Act
      render(<AnchorButton href={externalUrl}>外部リンク</AnchorButton>)

      // Assert
      const button = screen.getByRole('button', { name: '外部リンク' })
      expect(button).toHaveAttribute('href', externalUrl)
    })
  })

  describe('Props: 複合パターン', () => {
    it('prefix、suffix、すべてのカスタムpropsが同時に設定されている場合、すべてが正しく表示されること', () => {
      // Arrange
      const prefix = <span data-testid="prefix">←</span>
      const suffix = <span data-testid="suffix">→</span>
      const text = 'フルカスタムボタン'

      // Act
      render(
        <AnchorButton
          href="/test"
          theme="secondary"
          variant="outlined"
          shape="squared"
          prefix={prefix}
          suffix={suffix}
          className="custom"
        >
          {text}
        </AnchorButton>,
      )

      // Assert
      const button = screen.getByRole('button', { name: /フルカスタムボタン/ })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('data-theme', 'secondary')
      expect(button).toHaveAttribute('data-variant', 'outlined')
      expect(button).toHaveAttribute('data-shape', 'squared')
      expect(button).toHaveClass('custom')
      expect(screen.getByTestId('prefix')).toBeInTheDocument()
      expect(screen.getByTestId('suffix')).toBeInTheDocument()
    })
  })
})
