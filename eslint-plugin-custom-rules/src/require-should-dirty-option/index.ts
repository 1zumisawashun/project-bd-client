import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { createRule, isUseForm, isUseFormContext, checkSetValue } from './utils'

/**
 * NOTE: setValueの引数の処理
 * @see https://eslint.org/docs/latest/extend/custom-rules#scope-variables
 */

/**
 * setValueのnodeを取得する。
 * const nodeSource = sourceCode.getText(node); でも取得できそう
 * @see https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/#context.getscope()
 * @see https://eslint.org/docs/latest/extend/custom-rules#accessing-the-source-text
 */

/**
 * @see https://github.com/andykao1213/eslint-plugin-react-hook-form/blob/f210951a28db93ca456f877832bba479826d7e0b/lib/rules/no-nested-object-setvalue.js
 * @see https://zenn.dev/cybozu_frontend/articles/ts-eslint-new-syntax
 */
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
