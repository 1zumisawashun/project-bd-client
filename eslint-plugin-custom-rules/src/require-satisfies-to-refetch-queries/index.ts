import { ESLintUtils, TSESTree } from '@typescript-eslint/utils'
import {
  isArrayExpression,
  isIdentifier,
  isObjectExpression,
  isProperty,
  isVariableDeclarator,
} from '../utilities/utilities'

type Create = ReturnType<typeof createRule>['create']
type Context = Parameters<Create>[number]

const createRule = ESLintUtils.RuleCreator(() => {
  return `https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/require-satisfies-to-refetch-queries/README.md`
})

const isRefetchQueries = (node: TSESTree.Property) => {
  return isIdentifier(node.key) && node.key.name === 'refetchQueries'
}
const isHook = (node: TSESTree.CallExpression): boolean => {
  return isIdentifier(node.callee) && /^use[A-Z]\w*/.test(node.callee.name)
}
const isVariables = (node: TSESTree.Property) => {
  return isIdentifier(node.key) && node.key.name === 'variables'
}

// 実質的な型チェックはこの関数でのみ実施、他のロジックは通常のASTノードでの検出になる
const tsCheck = (context: Context, node: TSESTree.Property) => {
  const parserServices = context.sourceCode.parserServices

  if (!parserServices?.program || !parserServices?.esTreeNodeToTSNodeMap) {
    throw new Error('This rule requires `parserOptions.project`.')
  }

  const checker = parserServices.program.getTypeChecker()
  const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.value) // TypeScriptのASTノードを取得
  const type = checker.getTypeAtLocation(tsNode)
  const typeText = checker.typeToString(type)

  if (!typeText.includes('satisfies')) {
    context.report({ node, messageId: 'requireSatisfiesToRefetchQueries' })
  }
}

const checkVariables = (context: Context, node: TSESTree.ArrayExpression) => {
  node.elements.forEach((element) => {
    if (isObjectExpression(element)) {
      element.properties.forEach((property) => {
        if (isProperty(property) && isVariables(property)) {
          tsCheck(context, property)
        }
      })
    }
  })
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

          if (!isRefetchQueries(property)) return

          if (isArrayExpression(property.value)) {
            checkVariables(context, property.value)
          }
          // refetchQueriesを外に切り出しているパターン
          if (!isIdentifier(property.key)) return

          const refetchQueriesScope = context.sourceCode.getScope(node)
          const refetchQueries = refetchQueriesScope.set.get(property.key.name)

          refetchQueries?.references.forEach((r) => {
            const parent = r.identifier.parent
            if (
              isVariableDeclarator(parent) &&
              isArrayExpression(parent.init)
            ) {
              checkVariables(context, parent.init)
            }
          })
        }
      },
    }
  },
})
