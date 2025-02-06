import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils'

type Create = ReturnType<typeof createRule>['create']
type Context = Parameters<Create>[number]
type Fix = NonNullable<Parameters<Context['report']>[number]['fix']>
type RuleFix = ReturnType<Fix>
type Fixer = Parameters<Fix>[number]

export const createRule = ESLintUtils.RuleCreator(() => {
  return `https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/require-should-dirty/README.md`
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

/** @see https://github.com/andykao1213/eslint-plugin-react-hook-form */
export const rule = createRule({
  name: 'require-should-dirty',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce using shouldDirty: true in the second argument of setValue in react-hook-form for better state management.',
    },
    fixable: 'code',
    messages: {
      requireShouldDirty:
        'You must set shouldDirty when calling setValue for optimal performance and state consistency.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          requireShouldDirty: {
            type: 'boolean',
            default: true,
          },
        },
      },
    ],
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        // `useForm`または`useFormContext`で初期化されていた場合、次に進む
        if (isUseForm(node) || isUseFormContext(node)) {
          // `methods`が`useForm`または`useFormContext`の呼び出し結果である場合、次に進む
          if (node.id.type === AST_NODE_TYPES.Identifier) {
            const methodsScope = context.sourceCode.getScope(node)
            const methods = methodsScope.set.get(node.id.name)

            // `methods`の参照を見つけた場合、次に進む ex) methods.setValue(), methods.getValues() etc.
            methods?.references.forEach((r) => {
              const memberExpression = r.identifier.parent
              if (
                memberExpression.type === AST_NODE_TYPES.MemberExpression &&
                memberExpression.parent.type === AST_NODE_TYPES.CallExpression
              ) {
                const callExpression = memberExpression.parent
                checkSetValue(context, callExpression)
              }
            })
          }

          const property = (() => {
            if (node.id.type === AST_NODE_TYPES.ObjectPattern) {
              return node.id.properties.find((p) => {
                if (
                  p.type === AST_NODE_TYPES.Property &&
                  p.key.type === AST_NODE_TYPES.Identifier
                ) {
                  return p.key.name === 'setValue'
                }
                return null
              })
            }
            return null
          })()

          // `methods`が`useForm`または`useFormContext`の呼び出し結果である場合、次に進む
          if (property?.value?.type === AST_NODE_TYPES.Identifier) {
            const setValueScope = context.sourceCode.getScope(node)
            const setValue = setValueScope.set.get(property.value.name)

            // `setValue`の参照を見つけた場合、次に進む
            setValue?.references.forEach((r) => {
              if (r.identifier.parent.type === AST_NODE_TYPES.CallExpression) {
                const callExpression = r.identifier.parent
                checkSetValue(context, callExpression)
              }
            })
          }
        }
      },
    }
  },
})
