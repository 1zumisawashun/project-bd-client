import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(() => {
  return `https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/require-should-dirty/README.md`
})

/**
 * @see https://typescript-eslint.io/developers/custom-rules/#typed-rules
 */
export const rule = createRule({
  name: 'require-satisfies-to-refetch-queries',
  defaultOptions: [],
  meta: {
    docs: {
      description: 'require satisfies to refetch queries.',
    },
    messages: {
      requireSatisfiesToRefetchQueries: 'require satisfies to refetch queries.',
    },
    type: 'suggestion',
    schema: [],
  },
  create(context) {
    return {
      Property(node) {
        if (!isRefetchQueries(node)) return

        const parserServices = context.sourceCode.parserServices
        if (
          !parserServices?.program ||
          !parserServices?.esTreeNodeToTSNodeMap
        ) {
          throw new Error('This rule requires `parserOptions.project`.')
        }
        const checker = parserServices.program.getTypeChecker()
        // TypeScriptのASTノードを取得
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.value)
        const type = checker.getTypeAtLocation(tsNode)

        // `satisfies` が適用されているかをチェック
        const typeText = checker.typeToString(type)
        console.log(typeText, '=======')
        if (!typeText.includes('satisfies')) {
          context.report({
            node: node,
            messageId: 'requireSatisfiesToRefetchQueries',
          })
        }
      },
    }
  },
})

const isRefetchQueries = (node: TSESTree.Property) => {
  return (
    node.key.type === AST_NODE_TYPES.Identifier &&
    node.key.name === 'refetchQueries'
  )
}
