import { ESLintUtils, TSESTree, AST_NODE_TYPES } from '@typescript-eslint/utils'
import * as path from 'path'

/** @see https://github.com/mkpoli/eslint-plugin-no-array-concat/blob/master/src/utils.ts */
const createRule = ESLintUtils.RuleCreator((name) => {
  const dirname = path.relative(__dirname, path.dirname(name))
  const basename = path.basename(name, path.extname(name))
  return `https://github.com/mkpoli/eslint-plugin-no-array-concat/blob/master/docs/${dirname}/${basename}.md`
})

/** @see https://github.com/andykao1213/eslint-plugin-react-hook-form/blob/f210951a28db93ca456f877832bba479826d7e0b/lib/rules/no-nested-object-setvalue.js */
export const rule = createRule({
  name: 'require-should-dirty-option',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce using shouldDirty: true in the second argument of setValue in react-hook-form for better state management.',
    },
    fixable: 'code',
    messages: {
      requireShouldDirtyOption:
        'You must set shouldDirty: true when calling setValue for optimal performance and state consistency.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          requireShouldDirtyOption: {
            type: 'boolean',
            default: true,
          },
        },
      },
    ],
  },
  create(context) {
    const reportCallExpression = (
      callExpression: TSESTree.CallExpression,
    ): void => {
      context.report({
        node: callExpression,
        messageId: 'requireShouldDirtyOption',
      })
    }

    const reportObjectExpression = (
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
          return fixer.replaceText(
            objectExpression,
            `${optionsWithShouldDirty}`,
          )
        },
      })
    }

    const formatObjectToString = (obj: {}): string => {
      return JSON.stringify(obj, null, 2)
        .replace(/"([^"]+)":/g, '$1:')
        .replace(/"/g, '')
        .trim()
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

    /** @see https://zenn.dev/cybozu_frontend/articles/ts-eslint-new-syntax */
    return {
      VariableDeclarator: (node) => {
        // NOTE: useFormかuseFormContextをサポートする
        if (isUseForm(node) || isUseFormContext(node)) {
          // NOTE: const { setValue } = useForm(); or const { setValue } = useFormContext(); をサポートする
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

          /**
           * setValueのnodeを取得する。
           * const nodeSource = sourceCode.getText(node); でも取得できそう
           * @see https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/#context.getscope()
           * @see https://eslint.org/docs/latest/extend/custom-rules#accessing-the-source-text
           */
          if (property?.value?.type !== AST_NODE_TYPES.Identifier) return

          const setValue = context.sourceCode
            .getScope(node)
            .set.get(property.value.name)

          /**
           * NOTE: setValueの引数の処理
           * @see https://eslint.org/docs/latest/extend/custom-rules#scope-variables
           */
          setValue?.references.forEach((r) => {
            if (r.identifier.parent.type === AST_NODE_TYPES.CallExpression) {
              const callExpression = r.identifier.parent
              const thirdArgument = callExpression.arguments.at(2)

              if (thirdArgument?.type === AST_NODE_TYPES.ObjectExpression) {
                reportObjectExpression(thirdArgument)
              } else {
                reportCallExpression(callExpression)
              }
            }
          })
        }
      },
    }
  },
})

/**
 * 実装メモ
 * プロパティアクセスをするためには毎回AST_NODE_TYPESを使ってtypeGuardをする必要がある
 * そのためにそれぞれのオブジェクトはtypeを持っているのか
 * getScopeの分割代入での取り出しはngぽい、npm run lint:jsで怒られた、確かそれっぽいドキュメントがあったような気がする
 */
