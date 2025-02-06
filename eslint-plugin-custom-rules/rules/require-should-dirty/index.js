"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
const utils_1 = require("@typescript-eslint/utils");
const createRule = utils_1.ESLintUtils.RuleCreator(() => {
    return `https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/require-should-dirty/README.md`;
});
const isShouldDirty = (property) => {
    return (property.type === utils_1.AST_NODE_TYPES.Property &&
        property.key.type === utils_1.AST_NODE_TYPES.Identifier &&
        property.key.name === 'shouldDirty');
};
const isSetValue = (property) => {
    return (property.type === utils_1.AST_NODE_TYPES.Property &&
        property.key.type === utils_1.AST_NODE_TYPES.Identifier &&
        property.key.name === 'setValue');
};
const isUseForm = (node) => {
    return (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator &&
        node.init?.type === utils_1.AST_NODE_TYPES.CallExpression &&
        node.init?.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
        node.init?.callee.name === 'useForm');
};
const isUseFormContext = (node) => {
    return (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator &&
        node.init?.type === utils_1.AST_NODE_TYPES.CallExpression &&
        node.init?.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
        node.init?.callee.name === 'useFormContext');
};
const formatObjectToString = (obj) => {
    return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:');
};
const fixShouldDirty = (objectExpression) => (fixer) => {
    const defaultOptions = objectExpression.properties.reduce((acc, cur) => {
        if (cur.type === utils_1.AST_NODE_TYPES.Property &&
            cur.key.type === utils_1.AST_NODE_TYPES.Identifier &&
            cur.value.type === utils_1.AST_NODE_TYPES.Literal) {
            acc[cur.key.name] = cur.value.value;
        }
        return acc;
    }, {});
    const optionsWithShouldDirty = formatObjectToString({
        ...defaultOptions,
        shouldDirty: true,
    });
    return fixer.replaceText(objectExpression, optionsWithShouldDirty);
};
const reportShouldDirty = (context, objectExpression) => {
    context.report({
        node: objectExpression,
        messageId: 'requireShouldDirty',
        fix: fixShouldDirty(objectExpression),
    });
};
const reportThirdArgument = (context, node) => {
    context.report({ node, messageId: 'requireShouldDirty' });
};
const checkSetValue = (context, callExpression) => {
    const secondArgument = callExpression.arguments.at(1);
    const thirdArgument = callExpression.arguments.at(2);
    if (secondArgument && !thirdArgument) {
        reportThirdArgument(context, callExpression);
    }
    if (thirdArgument?.type === utils_1.AST_NODE_TYPES.ObjectExpression) {
        const hasShouldDirty = thirdArgument.properties.some(isShouldDirty);
        if (hasShouldDirty)
            return;
        reportShouldDirty(context, thirdArgument);
    }
};
/** @see https://github.com/andykao1213/eslint-plugin-react-hook-form */
exports.rule = createRule({
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
                if (isUseForm(node) || isUseFormContext(node)) {
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
                                checkSetValue(context, callExpression);
                            }
                        });
                    }
                    const property = node.id.type === utils_1.AST_NODE_TYPES.ObjectPattern
                        ? node.id.properties.find(isSetValue)
                        : null;
                    // `methods`が`useForm`または`useFormContext`の呼び出し結果である場合、次に進む
                    if (property?.value?.type === utils_1.AST_NODE_TYPES.Identifier) {
                        const setValueScope = context.sourceCode.getScope(node);
                        const setValue = setValueScope.set.get(property.value.name);
                        // `setValue`の参照を見つけた場合、次に進む
                        setValue?.references.forEach((r) => {
                            if (r.identifier.parent.type === utils_1.AST_NODE_TYPES.CallExpression) {
                                const callExpression = r.identifier.parent;
                                checkSetValue(context, callExpression);
                            }
                        });
                    }
                }
            },
        };
    },
});
