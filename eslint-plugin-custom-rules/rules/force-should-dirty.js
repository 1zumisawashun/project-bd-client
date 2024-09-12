"use strict";
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * これが一番答えに近そう
 * @see https://github.com/andykao1213/eslint-plugin-react-hook-form/blob/f210951a28db93ca456f877832bba479826d7e0b/lib/rules/no-nested-object-setvalue.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
const utils_1 = require("@typescript-eslint/utils");
// ルールのドキュメントURL
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
exports.rule = createRule({
    name: 'force-should-dirty',
    defaultOptions: [],
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce using shouldDirty: true in the second argument of setValue in react-hook-form for better state management.',
        },
        fixable: 'code',
        messages: {
            forceShouldDirty: 'You must set shouldDirty: true when calling setValue for optimal performance and state consistency.',
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
                var _a, _b, _c, _d, _e;
                const isUseForm = node.type === 'VariableDeclarator' &&
                    ((_a = node.init) === null || _a === void 0 ? void 0 : _a.type) === 'CallExpression' &&
                    // @ts-ignore
                    ((_b = node.init) === null || _b === void 0 ? void 0 : _b.callee.name) === 'useForm';
                const isUseFormContext = node.type === 'VariableDeclarator' &&
                    ((_c = node.init) === null || _c === void 0 ? void 0 : _c.type) === 'CallExpression' &&
                    // @ts-ignore
                    ((_d = node.init) === null || _d === void 0 ? void 0 : _d.callee.name) === 'useFormContext';
                // useFormかuseFormContextをサポートする
                if (isUseForm || isUseFormContext) {
                    // const { setValue } = useForm(); だけをサポートする
                    const setValueProperty = (() => {
                        if (node.id.type === 'ObjectPattern') {
                            // @ts-ignore
                            return node.id.properties.find((p) => p.key.name === 'setValue');
                        }
                        return null;
                    })();
                    // Identifierの意味がわからない
                    if (((_e = setValueProperty === null || setValueProperty === void 0 ? void 0 : setValueProperty.value) === null || _e === void 0 ? void 0 : _e.type) !== 'Identifier')
                        return;
                    // MEMO: setValueProperty.value.name = setValue
                    // 少なくともここに降ってくるnodeはsetValueのnodeになるのか
                    // MEMO: setValueのnodeを取得する
                    const setValue = context.sourceCode
                        .getScope(node)
                        .set.get(setValueProperty.value.name);
                    if (!setValue)
                        return;
                    // ここでsetValueの引数の処理を行っているのね
                    setValue.references.forEach((setValueReference) => {
                        if (setValueReference.identifier.parent.type === 'CallExpression') {
                            const setValueCallExpression = setValueReference.identifier.parent;
                            const thirdArgument = setValueCallExpression.arguments.at(2);
                            // optionsがない場合
                            if (!thirdArgument) {
                                return context.report({
                                    node: setValueCallExpression,
                                    messageId: 'forceShouldDirty',
                                });
                            }
                            // optionsがあるけどshouldDirtyを指定していない場合
                            if (thirdArgument.type === 'ObjectExpression') {
                                const hasShouldDirty = thirdArgument.properties.some(
                                // @ts-ignore
                                (p) => p.key.name === 'shouldDirty');
                                const options = thirdArgument.properties.reduce((acc, cur) => {
                                    // @ts-ignore
                                    acc[cur.key.name] = cur.value.value;
                                    return acc;
                                }, {});
                                const optionsWithShouldDirty = formatObjectToString(Object.assign(Object.assign({}, options), { shouldDirty: true }));
                                if (!hasShouldDirty) {
                                    return context.report({
                                        node: thirdArgument,
                                        messageId: 'forceShouldDirty',
                                        fix(fixer) {
                                            return fixer.replaceText(thirdArgument, `${optionsWithShouldDirty}`);
                                        },
                                    });
                                }
                            }
                        }
                        return null;
                    });
                }
            },
        };
    },
});
/** @description オブジェクトを文字列に変換して、適切にフォーマットを整える */
const formatObjectToString = (obj) => {
    return JSON.stringify(obj, null, 2) // スペースを含めて整形
        .replace(/"([^"]+)":/g, '$1:') // キーのダブルクオートを削除
        .replace(/"/g, '') // 値のダブルクオートを削除
        .trim(); // 余計な空白を除去
};
