"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
const utils_1 = require("@typescript-eslint/utils");
const requireShouldDirty_helper_1 = require("./requireShouldDirty.helper");
/** @see https://github.com/andykao1213/eslint-plugin-react-hook-form */
exports.rule = (0, requireShouldDirty_helper_1.createRule)({
    name: 'require-should-dirty',
    defaultOptions: [],
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce using shouldDirty: true in the second argument of setValue in react-hook-form for better state management.',
        },
        fixable: 'code',
        messages: {
            requireShouldDirty: 'You must set shouldDirty when calling setValue for optimal performance and state consistency.',
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
                if ((0, requireShouldDirty_helper_1.isUseForm)(node) || (0, requireShouldDirty_helper_1.isUseFormContext)(node)) {
                    // `methods`が`useForm`または`useFormContext`の呼び出し結果である場合、次に進む
                    if (node.id.type === utils_1.AST_NODE_TYPES.Identifier) {
                        const methodsScope = context.sourceCode.getScope(node);
                        const methods = methodsScope.set.get(node.id.name);
                        // `methods`の参照を見つけた場合、次に進む ex) methods.setValue(), methods.getValues() etc.
                        methods?.references.forEach((r) => {
                            const memberExpression = r.identifier.parent;
                            if (memberExpression.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                                memberExpression.parent.type === utils_1.AST_NODE_TYPES.CallExpression) {
                                const callExpression = memberExpression.parent;
                                (0, requireShouldDirty_helper_1.checkSetValue)(context, callExpression);
                            }
                        });
                    }
                    const property = (() => {
                        if (node.id.type === utils_1.AST_NODE_TYPES.ObjectPattern) {
                            return node.id.properties.find((p) => {
                                if (p.type === utils_1.AST_NODE_TYPES.Property &&
                                    p.key.type === utils_1.AST_NODE_TYPES.Identifier) {
                                    return p.key.name === 'setValue';
                                }
                                return null;
                            });
                        }
                        return null;
                    })();
                    // `methods`が`useForm`または`useFormContext`の呼び出し結果である場合、次に進む
                    if (property?.value?.type === utils_1.AST_NODE_TYPES.Identifier) {
                        const setValueScope = context.sourceCode.getScope(node);
                        const setValue = setValueScope.set.get(property.value.name);
                        // `setValue`の参照を見つけた場合、次に進む
                        setValue?.references.forEach((r) => {
                            if (r.identifier.parent.type === utils_1.AST_NODE_TYPES.CallExpression) {
                                const callExpression = r.identifier.parent;
                                (0, requireShouldDirty_helper_1.checkSetValue)(context, callExpression);
                            }
                        });
                    }
                }
            },
        };
    },
});
