import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/utils'

import {
  createRule,
  isUseForm,
  isUseFormContext,
  reportCallExpression,
  reportObjectExpression,
} from './utils'

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
    /** @see https://zenn.dev/cybozu_frontend/articles/ts-eslint-new-syntax */
    return {
      VariableDeclarator(node) {
        // `methods`が`useForm`で初期化されているか確認
        if (isUseForm(node) || isUseFormContext(node)) {
          // `methods`が`useForm`の呼び出し結果であることが確認できた
          const methodsScope = context.sourceCode.getScope(node)
          const methods = methodsScope.set.get('methods')

          if (methods) {
            // `methods`の参照を見つけた場合、次に進む
            methods.references.forEach((reference) => {
              // ここがCallExpressionではないのかー
              if (
                // parentはマジで可変なのかー
                reference.identifier.parent.type ===
                AST_NODE_TYPES.MemberExpression
              ) {
                // ここからsetValueのargementを拾う必要がある
                const memberExpression = reference.identifier.parent
                if (
                  memberExpression.parent.type === AST_NODE_TYPES.CallExpression
                ) {
                  const callExpression = memberExpression.parent

                  // referenceってことはmethodsから派生している場所が対象になるってことか
                  const thirdArgument = callExpression.arguments.at(2)
                  if (thirdArgument?.type === AST_NODE_TYPES.ObjectExpression) {
                    reportObjectExpression(context, thirdArgument)
                  } else {
                    reportCallExpression(context, callExpression)
                  }
                }
              }
            })
          }

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
          // 結局この中には"setValue"が入っているのかー
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
                reportObjectExpression(context, thirdArgument)
              } else {
                reportCallExpression(context, callExpression)
              }
            }
          })
        }
      },
    }
  },
})
