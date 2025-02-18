"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
var utils_1 = require("@typescript-eslint/utils");
var utilities_1 = require("../utilities/utilities");
var createRule = utils_1.ESLintUtils.RuleCreator(function () {
    return "https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/require-satisfies-to-refetch-queries/README.md";
});
var isRefetchQueries = function (node) {
    return (0, utilities_1.isIdentifier)(node.key) && node.key.name === 'refetchQueries';
};
var isHook = function (node) {
    return (0, utilities_1.isIdentifier)(node.callee) && /^use[A-Z]\w*/.test(node.callee.name);
};
var isVariables = function (node) {
    return (0, utilities_1.isIdentifier)(node.key) && node.key.name === 'variables';
};
// 実質的な型チェックはこの関数でのみ実施、他のロジックは通常のASTノードでの検出になる
var tsCheck = function (context, node) {
    var parserServices = context.sourceCode.parserServices;
    if (!(parserServices === null || parserServices === void 0 ? void 0 : parserServices.program) || !(parserServices === null || parserServices === void 0 ? void 0 : parserServices.esTreeNodeToTSNodeMap)) {
        throw new Error('This rule requires `parserOptions.project`.');
    }
    var checker = parserServices.program.getTypeChecker();
    var tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.value); // TypeScriptのASTノードを取得
    var type = checker.getTypeAtLocation(tsNode);
    var typeText = checker.typeToString(type);
    if (!typeText.includes('satisfies')) {
        context.report({ node: node, messageId: 'requireSatisfiesToRefetchQueries' });
    }
};
var checkVariables = function (context, node) {
    node.elements.forEach(function (element) {
        if ((0, utilities_1.isObjectExpression)(element)) {
            element.properties.forEach(function (property) {
                if ((0, utilities_1.isProperty)(property) && isVariables(property)) {
                    tsCheck(context, property);
                }
            });
        }
    });
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
                    var objectExpression = node.arguments.find(utilities_1.isObjectExpression);
                    if (!objectExpression)
                        return;
                    var property = objectExpression.properties.find(utilities_1.isProperty);
                    if (!property)
                        return;
                    if (!isRefetchQueries(property))
                        return;
                    if ((0, utilities_1.isArrayExpression)(property.value)) {
                        checkVariables(context, property.value);
                    }
                    // refetchQueriesを外に切り出しているパターン
                    if (!(0, utilities_1.isIdentifier)(property.key))
                        return;
                    var refetchQueriesScope = context.sourceCode.getScope(node);
                    var refetchQueries = refetchQueriesScope.set.get(property.key.name);
                    refetchQueries === null || refetchQueries === void 0 ? void 0 : refetchQueries.references.forEach(function (r) {
                        var parent = r.identifier.parent;
                        if ((0, utilities_1.isVariableDeclarator)(parent) &&
                            (0, utilities_1.isArrayExpression)(parent.init)) {
                            checkVariables(context, parent.init);
                        }
                    });
                }
            },
        };
    },
});
