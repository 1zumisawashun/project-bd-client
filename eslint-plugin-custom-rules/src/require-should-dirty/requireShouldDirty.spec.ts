import { RuleTester } from '@typescript-eslint/rule-tester'

import { rule } from './requireShouldDirty'

/**
 * @typescript-eslint/rule-tester v8から languageOptions が追加されたりしている
 * v7 に下げないと何故かテストが走らない
 */
const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run('require-should-dirty', rule, {
  valid: [
    {
      code: `
      const { setValue } = useForm();
      setValue('fieldName', value, { shouldDirty: true });
      `,
    },
    {
      code: `
      const { setValue } = useForm()
      setValue('fieldName', value, { shouldDirty: true, shouldTouch: true })
      `,
    },
    {
      code: `
      const { setValue } = useForm()
      setValue('fieldName', value, { shouldDirty: true, shouldValidate: true })
      `,
    },
    {
      code: `
      const { setValue } = useFormContext();
      setValue('fieldName', value, { shouldDirty: true });
      `,
    },
    {
      code: `
      const { setValue } = useFormContext()
      setValue('fieldName', value, { shouldDirty: true, shouldTouch: true })
      `,
    },
    {
      code: `
      const { setValue } = useFormContext()
      setValue('fieldName', value, { shouldDirty: true, shouldValidate: true })
      `,
    },
  ],

  invalid: [
    {
      code: `
      const { setValue } = useForm()
      setValue('fieldName', value, {})
      `,
      output: `
      const { setValue } = useForm()
      setValue('fieldName', value, {shouldDirty:true})
      `,
      errors: [{ messageId: 'requireShouldDirty' }],
    },
    {
      code: `
      const { setValue } = useForm()
      setValue('fieldName', value, { shouldValidate:true })
      `,
      output: `
      const { setValue } = useForm()
      setValue('fieldName', value, {shouldValidate:true,shouldDirty:true})
      `,
      errors: [{ messageId: 'requireShouldDirty' }],
    },
    {
      code: `
      const { setValue } = useForm()
      setValue('fieldName', value, { shouldTouch: true })
      `,
      output: `
      const { setValue } = useForm()
      setValue('fieldName', value, {shouldTouch:true,shouldDirty:true})
      `,
      errors: [{ messageId: 'requireShouldDirty' }],
    },
  ],
})