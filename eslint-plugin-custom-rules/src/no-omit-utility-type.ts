// eslint-disable-next-line import/no-extraneous-dependencies
import { ESLintUtils } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`, // ルールのドキュメントURL
)

export const rule = createRule({
  create(context) {
    return {
      TSTypeReference(node) {
        if (
          node.typeName.type === 'Identifier' &&
          node.typeName.name === 'Omit'
        ) {
          context.report({
            node,
            messageId: 'no-omit-utility-type',
          })
        }
      },
    }
  },
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow the use of the `Omit` utility type',
    },
    messages: {
      'no-omit-utility-type': 'The `Omit` utility type is forbidden',
    },
    schema: [],
  },
  name: 'no-omit-utility-type',
  defaultOptions: [],
})
