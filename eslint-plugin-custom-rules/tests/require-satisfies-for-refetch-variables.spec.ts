import tsESLintParser from '@typescript-eslint/parser'
import { RuleTester } from '@typescript-eslint/rule-tester'
import { rule } from '../src/require-satisfies-for-refetch-variables'

/**
 * @see https://typescript-eslint.io/developers/custom-rules/#testing-typed-rules
 */
const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.ts*'],
      },
      parser: tsESLintParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
})

ruleTester.run('require-satisfies-for-refetch-variables', rule, {
  valid: [
    {
      code: `
      export const [mutation] = useMutation({
        refetchQueries: [
          {
            query: null,
            variables: { id: "id" } satisfies { id: string },
          },
        ],
      })
      `,
    },
  ],
  invalid: [
    {
      code: `
      export const [mutation] = useMutation({
        refetchQueries: [
          {
            query: null,
            variables: { id: "id" },
          },
        ],
      })
      `,
      errors: [{ messageId: 'requireSatisfiesForRefetchVariables' }],
    },
  ],
})
