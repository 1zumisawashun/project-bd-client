import { AnchorButton } from '../../../../app/components/buttons/AnchorButton'
import {
  render,
  screen,
} from '../../../../app/functions/libs/react-testing-library/test-utils'

describe('AnchorButton', () => {
  it('disabled=trueの場合、リンクが無効化されること', () => {
    // Arrange
    render(
      <AnchorButton href="/test" disabled={true}>
        無効なボタン
      </AnchorButton>,
    )

    // Assert
    expect(
      screen.getByRole('button', { name: '無効なボタン' }),
    ).toHaveAttribute('aria-disabled', 'true')
  })
})
