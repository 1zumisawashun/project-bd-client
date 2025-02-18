"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
var utils_1 = require("@typescript-eslint/utils");
var createRule = utils_1.ESLintUtils.RuleCreator(function () {
    return "https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/require-should-dirty/README.md";
});
var isRefetchQueries = function (node) {
    return (node.key.type === utils_1.AST_NODE_TYPES.Identifier &&
        node.key.name === 'refetchQueries');
};
var isHook = function (node) {
    return (node.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
        /^use[A-Z]\w*/.test(node.callee.name));
};
var isObjectExpression = function (node) {
    return node.type === utils_1.AST_NODE_TYPES.ObjectExpression;
};
var isProperty = function (node) {
    return node.type === utils_1.AST_NODE_TYPES.Property;
};
/**
 * @see https://typescript-eslint.io/developers/custom-rules/#typed-rules
 * @see https://www.apollographql.com/docs/react/data/mutations#refetching-queries
 */
exports.rule = createRule({
    name: 'require-satisfies-to-refetch-queries',
    defaultOptions: [],
    meta: {
        docs: {
            description: 'require satisfies to refetch queries.',
        },
        messages: {
            requireSatisfiesToRefetchQueries: 'require satisfies to refetch queries.',
        },
        type: 'suggestion',
        schema: [],
    },
    create: function (context) {
        return {
            CallExpression: function (node) {
                if (isHook(node)) {
                    var objectExpression = node.arguments.find(isObjectExpression);
                    if (!objectExpression)
                        return;
                    var property = objectExpression.properties.find(isProperty);
                    if (!property)
                        return;
                    if (isRefetchQueries(property)) {
                        var parserServices = context.sourceCode.parserServices;
                        if (!(parserServices === null || parserServices === void 0 ? void 0 : parserServices.program) ||
                            !(parserServices === null || parserServices === void 0 ? void 0 : parserServices.esTreeNodeToTSNodeMap)) {
                            throw new Error('This rule requires `parserOptions.project`.');
                        }
                        var checker = parserServices.program.getTypeChecker();
                        // TypeScriptのASTノードを取得
                        var tsNode = parserServices.esTreeNodeToTSNodeMap.get(property.value);
                        var type = checker.getTypeAtLocation(tsNode);
                        // `satisfies` が適用されているかをチェック
                        var typeText = checker.typeToString(type);
                        if (!typeText.includes('satisfies')) {
                            context.report({
                                node: property,
                                messageId: 'requireSatisfiesToRefetchQueries',
                            });
                        }
                    }
                }
            },
        };
    },
});
