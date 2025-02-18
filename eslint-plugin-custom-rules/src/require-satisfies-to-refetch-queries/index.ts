import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(() => {
  return `https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/require-should-dirty/README.md`
})

const isRefetchQueries = (node: TSESTree.Property) => {
  return (
    node.key.type === AST_NODE_TYPES.Identifier &&
    node.key.name === 'refetchQueries'
  )
}

const isHook = (node: TSESTree.CallExpression): boolean => {
  return (
    node.callee.type === AST_NODE_TYPES.Identifier &&
    /^use[A-Z]\w*/.test(node.callee.name)
  )
}

const isObjectExpression = (node: TSESTree.Node) => {
  return node.type === AST_NODE_TYPES.ObjectExpression
}

const isProperty = (node: TSESTree.Node) => {
  return node.type === AST_NODE_TYPES.Property
}

/**
 * @see https://typescript-eslint.io/developers/custom-rules/#typed-rules
 * @see https://www.apollographql.com/docs/react/data/mutations#refetching-queries
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
      CallExpression(node) {
        if (isHook(node)) {
          const objectExpression = node.arguments.find(isObjectExpression)
          if (!objectExpression) return

          const property = objectExpression.properties.find(isProperty)
          if (!property) return

          if (isRefetchQueries(property)) {
            const parserServices = context.sourceCode.parserServices
            if (
              !parserServices?.program ||
              !parserServices?.esTreeNodeToTSNodeMap
            ) {
              throw new Error('This rule requires `parserOptions.project`.')
            }
            const checker = parserServices.program.getTypeChecker()
            // TypeScriptのASTノードを取得
            const tsNode = parserServices.esTreeNodeToTSNodeMap.get(
              property.value,
            )
            const type = checker.getTypeAtLocation(tsNode)

            // `satisfies` が適用されているかをチェック
            const typeText = checker.typeToString(type)

            if (!typeText.includes('satisfies')) {
              context.report({
                node: property,
                messageId: 'requireSatisfiesToRefetchQueries',
              })
            }
          }
        }
      },
    }
  },
})
