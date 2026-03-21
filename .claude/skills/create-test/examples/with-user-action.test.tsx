import { SimpleDialog } from '../../../../app/components/elements/SimpleDialog'
import {
  render,
  screen,
} from '../../../../app/functions/libs/react-testing-library/test-utils'
describe('ContactModal', () => {
  it('変更なしでキャンセルボタンを押下した場合、モーダルが閉じること', async () => {
    // Arrange
    const onClose = jest.fn()
    const { user } = render(
      <SimpleDialog isOpen={true} close={onClose} title="テストモーダル" />,
    )

    // Act
    await user.click(screen.getByRole('button', { name: '閉じる' }))

    // Assert
    expect(onClose).toHaveBeenCalled()
  })
})
