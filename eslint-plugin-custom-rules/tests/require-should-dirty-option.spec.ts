import { RuleTester } from '@typescript-eslint/rule-tester'

import { rule } from '../src/require-should-dirty-option'

/**
 * @typescript-eslint/rule-tester v8から languageOptions が追加されたりしている
 * v7 に下げないと何故かテストが走らない
 */
const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run('require-should-dirty-option', rule, {
  valid: [
    {
      code: `
      const { setValue } = useForm();
      setValue('', '', { shouldDirty: true });
      `,
    },
    {
      code: `
      const { setValue } = useForm()
      setValue('', '', { shouldDirty: true, shouldTouch: true })
      `,
    },
    {
      code: `
      const { setValue } = useForm()
      setValue('', '', { shouldDirty: true, shouldValidate: true })
      `,
    },
    {
      code: `
      const { setValue } = useFormContext();
      setValue('', '', { shouldDirty: true });
      `,
    },
    {
      code: `
      const { setValue } = useFormContext()
      setValue('', '', { shouldDirty: true, shouldTouch: true })
      `,
    },
    {
      code: `
      const { setValue } = useFormContext()
      setValue('', '', { shouldDirty: true, shouldValidate: true })
      `,
    },
  ],

  invalid: [
    {
      code: `
          const { setValue } = useForm()
          setValue('', '', {})
          `,
      output: `
          const { setValue } = useForm()
          setValue('', '', {
  shouldDirty: true
})
          `,
      errors: [{ messageId: 'requireShouldDirtyOption' }],
    },
    {
      code: `
          const { setValue } = useForm()
          setValue('', '', { shouldValidate: true })
          `,
      output: `
          const { setValue } = useForm()
          setValue('', '', {
  shouldValidate: true,
  shouldDirty: true
})
          `,
      errors: [{ messageId: 'requireShouldDirtyOption' }],
    },
    {
      code: `
          const { setValue } = useForm()
          setValue('', '', { shouldTouch: true })
          `,
      output: `
          const { setValue } = useForm()
          setValue('', '', {
  shouldTouch: true,
  shouldDirty: true
})
          `,
      errors: [{ messageId: 'requireShouldDirtyOption' }],
    },
  ],
})
