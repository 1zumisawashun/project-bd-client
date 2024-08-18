import { Nl2br } from '@/components/elements/Nl2br'
import { faq } from './Faq.constant'
import 'server-only'

enum FaqCategory {
  General = 'General',
  Account = 'Account',
  Payment = 'Payment',
}

export const Faq: React.FC = () => <Nl2br>{faq}</Nl2br>
