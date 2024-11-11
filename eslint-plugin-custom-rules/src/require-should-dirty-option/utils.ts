import { ESLintUtils, TSESTree, AST_NODE_TYPES } from '@typescript-eslint/utils'
import * as path from 'path'

/** @see https://github.com/mkpoli/eslint-plugin-no-array-concat/blob/master/src/utils.ts */
export const createRule = ESLintUtils.RuleCreator((name) => {
  // const dirname = path.relative(__dirname, path.dirname(name))
  const basename = path.basename(name, path.extname(name))
  return `https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/${basename}/index.md`
})

type Context = Parameters<ReturnType<typeof createRule>['create']>[number]

export const reportNode = (context: Context, node: TSESTree.Node): void => {
  context.report({
    node,
    messageId: 'requireShouldDirtyOption',
  })
}

export const reportObjectExpression = (
  context: Context,
  objectExpression: TSESTree.ObjectExpression,
): void => {
  const hasShouldDirty = objectExpression.properties.some((p) => {
    if (
      p.type === AST_NODE_TYPES.Property &&
      p.key.type === AST_NODE_TYPES.Identifier
    ) {
      return p.key.name === 'shouldDirty'
    }
    return false
  })

  if (hasShouldDirty) return

  const defaultOptions = objectExpression.properties.reduce<
    Record<string, any>
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

  context.report({
    node: objectExpression,
    messageId: 'requireShouldDirtyOption',
    fix(fixer) {
      return fixer.replaceText(objectExpression, `${optionsWithShouldDirty}`)
    },
  })
}

export const formatObjectToString = (obj: {}): string => {
  return JSON.stringify(obj, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, '')
    .trim()
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
