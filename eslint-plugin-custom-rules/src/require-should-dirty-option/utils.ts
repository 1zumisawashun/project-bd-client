import { ESLintUtils, TSESTree, AST_NODE_TYPES } from '@typescript-eslint/utils'
import * as path from 'path'

type Context = Parameters<ReturnType<typeof createRule>['create']>[number]
export type Fixer = Parameters<
  NonNullable<Parameters<Context['report']>[number]['fix']>
>[number]

/** @see https://github.com/mkpoli/eslint-plugin-no-array-concat/blob/master/src/utils.ts */
export const createRule = ESLintUtils.RuleCreator((name) => {
  // const dirname = path.relative(__dirname, path.dirname(name))
  const basename = path.basename(name, path.extname(name))
  return `https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/${basename}/index.md`
})

const fixNoShouldDirty =
  (objectExpression: TSESTree.ObjectExpression) => (fixer: Fixer) => {
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
    return fixer.replaceText(objectExpression, optionsWithShouldDirty)
  }

const reportNoShouldDirty = (
  context: Context,
  objectExpression: TSESTree.ObjectExpression,
): void => {
  context.report({
    node: objectExpression,
    messageId: 'requireShouldDirtyOption',
    fix: fixNoShouldDirty(objectExpression),
  })
}

const reportNoThirdArgument = (
  context: Context,
  loc: TSESTree.Node['loc'],
): void => {
  context.report({
    loc, // 第1引数〜第2引数の間を指定
    messageId: 'requireShouldDirtyOption',
  })
}

export const checkSetValue = (
  context: Context,
  callExpression: TSESTree.CallExpression,
) => {
  const firstArgument = callExpression.arguments.at(0)
  const secondArgument = callExpression.arguments.at(1)
  const thirdArgument = callExpression.arguments.at(2)

  const loc = {
    start: firstArgument!.loc.start,
    end: secondArgument!.loc.end,
  }

  if (secondArgument && !thirdArgument) {
    reportNoThirdArgument(context, loc)
  }

  if (thirdArgument?.type === AST_NODE_TYPES.ObjectExpression) {
    if (!hasShouldDirty(thirdArgument)) {
      reportNoShouldDirty(context, thirdArgument)
    }
  }
}

const formatObjectToString = (obj: {}): string => {
  return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:')
}

const hasShouldDirty = (objectExpression: TSESTree.ObjectExpression) => {
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
