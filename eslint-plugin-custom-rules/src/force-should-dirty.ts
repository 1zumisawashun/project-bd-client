/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * これが一番答えに近そう
 * @see https://github.com/andykao1213/eslint-plugin-react-hook-form/blob/f210951a28db93ca456f877832bba479826d7e0b/lib/rules/no-nested-object-setvalue.js
 */

import { ESLintUtils } from '@typescript-eslint/utils'

// ルールのドキュメントURL
const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`,
)

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export const rule = createRule({
  name: 'force-should-dirty',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce using shouldDirty: true in the second argument of setValue in react-hook-form for better state management.',
    },
    fixable: 'code',
    messages: {
      forceShouldDirty:
        'You must set shouldDirty: true when calling setValue for optimal performance and state consistency.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          enforceShouldDirty: {
            type: 'boolean',
            default: true,
          },
        },
      },
    ],
  },
  create(context) {
    return {
      VariableDeclarator: (node) => {
        const isUseForm =
          node.type === 'VariableDeclarator' &&
          node.init?.type === 'CallExpression' &&
          // @ts-ignore
          node.init?.callee.name === 'useForm'

        const isUseFormContext =
          node.type === 'VariableDeclarator' &&
          node.init?.type === 'CallExpression' &&
          // @ts-ignore
          node.init?.callee.name === 'useFormContext'

        // useFormかuseFormContextをサポートする
        if (isUseForm || isUseFormContext) {
          // const { setValue } = useForm(); だけをサポートする
          const setValueProperty = (() => {
            if (node.id.type === 'ObjectPattern') {
              // @ts-ignore
              return node.id.properties.find((p) => p.key.name === 'setValue')
            }
            return null
          })()

          // Identifierの意味がわからない
          if (setValueProperty?.value?.type !== 'Identifier') return

          // MEMO: setValueのnodeを取得する
          const setValue = context.sourceCode
            .getScope(node)
            .set.get(setValueProperty.value.name)

          if (!setValue) return

          // setValueの引数の処理
          setValue.references.forEach((setValueReference) => {
            if (setValueReference.identifier.parent.type === 'CallExpression') {
              const setValueCallExpression = setValueReference.identifier.parent
              const thirdArgument = setValueCallExpression.arguments.at(2)

              // optionsがない場合
              if (!thirdArgument) {
                return context.report({
                  node: setValueCallExpression,
                  messageId: 'forceShouldDirty',
                })
              }

              // optionsがあるけどshouldDirtyを指定していない場合
              if (thirdArgument.type === 'ObjectExpression') {
                const hasShouldDirty = thirdArgument.properties.some(
                  // @ts-ignore
                  (p) => p.key.name === 'shouldDirty',
                )

                const options = thirdArgument.properties.reduce((acc, cur) => {
                  // @ts-ignore
                  acc[cur.key.name] = cur.value.value
                  return acc
                }, {})

                const optionsWithShouldDirty = formatObjectToString({
                  ...options,
                  shouldDirty: true,
                })

                if (!hasShouldDirty) {
                  return context.report({
                    node: thirdArgument,
                    messageId: 'forceShouldDirty',
                    fix(fixer) {
                      return fixer.replaceText(
                        thirdArgument,
                        `${optionsWithShouldDirty}`,
                      )
                    },
                  })
                }
              }
            }

            return null
          })
        }
      },
    }
  },
})

/** @description オブジェクトを文字列に変換して、適切にフォーマットを整える */
const formatObjectToString = (obj: {}) => {
  return JSON.stringify(obj, null, 2) // スペースを含めて整形
    .replace(/"([^"]+)":/g, '$1:') // キーのダブルクオートを削除
    .replace(/"/g, '') // 値のダブルクオートを削除
    .trim() // 余計な空白を除去
}
