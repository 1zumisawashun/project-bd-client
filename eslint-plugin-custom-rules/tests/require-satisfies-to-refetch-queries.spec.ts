import { RuleTester } from '@typescript-eslint/rule-tester'
import { rule } from '../src/require-satisfies-to-refetch-queries'

/**
 * @see https://typescript-eslint.io/developers/custom-rules/#testing-typed-rules
 */
const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.ts*'],
      },
      tsconfigRootDir: __dirname,
    },
  },
})

ruleTester.run('require-satisfies-to-refetch-queries', rule, {
  valid: [
    /* ... */
  ],
  invalid: [
    /* ... */
  ],
})
