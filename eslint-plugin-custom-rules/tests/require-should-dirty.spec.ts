import { RuleTester } from '@typescript-eslint/rule-tester'

import { rule } from '../src/require-should-dirty'

const ruleTester = new RuleTester()

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
