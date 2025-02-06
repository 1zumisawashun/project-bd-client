import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils'

type Create = ReturnType<typeof createRule>['create']
type Context = Parameters<Create>[number]
type Fix = NonNullable<Parameters<Context['report']>[number]['fix']>
type RuleFix = ReturnType<Fix>
type Fixer = Parameters<Fix>[number]

const createRule = ESLintUtils.RuleCreator(() => {
  return `https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/require-should-dirty/README.md`
})

const isShouldDirty = (property: TSESTree.ObjectLiteralElement): boolean => {
  return (
    property.type === AST_NODE_TYPES.Property &&
    property.key.type === AST_NODE_TYPES.Identifier &&
    property.key.name === 'shouldDirty'
  )
}

const isSetValue = (
  property: TSESTree.Property | TSESTree.RestElement,
): boolean => {
  return (
    property.type === AST_NODE_TYPES.Property &&
    property.key.type === AST_NODE_TYPES.Identifier &&
    property.key.name === 'setValue'
  )
}

const isUseForm = (node: TSESTree.VariableDeclarator): boolean => {
  return (
    node.type === AST_NODE_TYPES.VariableDeclarator &&
    node.init?.type === AST_NODE_TYPES.CallExpression &&
    node.init?.callee.type === AST_NODE_TYPES.Identifier &&
    node.init?.callee.name === 'useForm'
  )
}

const isUseFormContext = (node: TSESTree.VariableDeclarator): boolean => {
  return (
    node.type === AST_NODE_TYPES.VariableDeclarator &&
    node.init?.type === AST_NODE_TYPES.CallExpression &&
    node.init?.callee.type === AST_NODE_TYPES.Identifier &&
    node.init?.callee.name === 'useFormContext'
  )
}

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
  context.report({ node, messageId: 'requireThirdArgument' })
}

const checkSetValue = (
  context: Context,
  callExpression: TSESTree.CallExpression,
): void => {
  const secondArgument = callExpression.arguments.at(1)
  const thirdArgument = callExpression.arguments.at(2)

  if (secondArgument && !thirdArgument) {
    reportThirdArgument(context, callExpression)
  }

  if (thirdArgument?.type === AST_NODE_TYPES.ObjectExpression) {
    const hasShouldDirty = thirdArgument.properties.some(isShouldDirty)
    if (hasShouldDirty) return
    reportShouldDirty(context, thirdArgument)
  }
}

/** @see https://github.com/andykao1213/eslint-plugin-react-hook-form */
export const rule = createRule({
  name: 'require-should-dirty',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'This custom ESLint rule enforces setting shouldDirty as the third argument of the setValue function when using the react-hook-form library.',
    },
    fixable: 'code',
    messages: {
      requireShouldDirty:
        'You must set the shouldDirty option when calling the setValue function in react-hook-form to ensure that the form state (isDirty) is properly managed.',
      requireThirdArgument:
        'You must set third argument when calling setValue function in react-hook-form.',
    },
    /**
     * If your rule doesn’t have options, do not set schema: false, but simply omit the schema property or use schema: []
     * @see https://eslint.org/docs/latest/extend/custom-rules#options-schemas
     */
    schema: [],
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

          const property =
            node.id.type === AST_NODE_TYPES.ObjectPattern
              ? node.id.properties.find(isSetValue)
              : null

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
