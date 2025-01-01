import { ESLintUtils, TSESTree, AST_NODE_TYPES } from '@typescript-eslint/utils'

type Create = ReturnType<typeof createRule>['create']
type Context = Parameters<Create>[number]
type Fix = NonNullable<Parameters<Context['report']>[number]['fix']>
type RuleFix = ReturnType<Fix>
type Fixer = Parameters<Fix>[number]

export const createRule = ESLintUtils.RuleCreator(() => {
  return `https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/require-should-dirty/requireShouldDirty.md`
})

const formatObjectToString = (obj: unknown): string => {
  return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:')
}

const fixShouldDirty =
  (objectExpression: TSESTree.ObjectExpression) =>
  (fixer: Fixer): RuleFix => {
    const defaultOptions = objectExpression.properties.reduce<
      Record<string, unknown>
    >((acc, cur) => {
      if (
        cur.type === AST_NODE_TYPES.Property &&
        cur.key.type === AST_NODE_TYPES.Identifier &&
        cur.value.type === AST_NODE_TYPES.Literal
      ) {
        acc[cur.key.name] = cur.value.value
      }
      return acc
    }, {})

    const optionsWithShouldDirty = formatObjectToString({
      ...defaultOptions,
      shouldDirty: true,
    })

    return fixer.replaceText(objectExpression, optionsWithShouldDirty)
  }

const reportShouldDirty = (
  context: Context,
  objectExpression: TSESTree.ObjectExpression,
): void => {
  context.report({
    node: objectExpression,
    messageId: 'requireShouldDirty',
    fix: fixShouldDirty(objectExpression),
  })
}

const reportThirdArgument = (context: Context, node: TSESTree.Node): void => {
  context.report({
    node,
    messageId: 'requireShouldDirty',
  })
}

const hasShouldDirty = (
  objectExpression: TSESTree.ObjectExpression,
): boolean => {
  return objectExpression.properties.some((p) => {
    if (
      p.type === AST_NODE_TYPES.Property &&
      p.key.type === AST_NODE_TYPES.Identifier
    ) {
      return p.key.name === 'shouldDirty'
    }
    return false
  })
}

export const checkSetValue = (
  context: Context,
  callExpression: TSESTree.CallExpression,
): void => {
  const secondArgument = callExpression.arguments.at(1)
  const thirdArgument = callExpression.arguments.at(2)

  if (secondArgument && !thirdArgument) {
    reportThirdArgument(context, callExpression)
  }

  if (thirdArgument?.type === AST_NODE_TYPES.ObjectExpression) {
    if (!hasShouldDirty(thirdArgument)) {
      reportShouldDirty(context, thirdArgument)
    }
  }
}

export const isUseForm = (node: TSESTree.VariableDeclarator): boolean => {
  return (
    node.type === AST_NODE_TYPES.VariableDeclarator &&
    node.init?.type === AST_NODE_TYPES.CallExpression &&
    node.init?.callee.type === AST_NODE_TYPES.Identifier &&
    node.init?.callee.name === 'useForm'
  )
}

export const isUseFormContext = (
  node: TSESTree.VariableDeclarator,
): boolean => {
  return (
    node.type === AST_NODE_TYPES.VariableDeclarator &&
    node.init?.type === AST_NODE_TYPES.CallExpression &&
    node.init?.callee.type === AST_NODE_TYPES.Identifier &&
    node.init?.callee.name === 'useFormContext'
  )
}
