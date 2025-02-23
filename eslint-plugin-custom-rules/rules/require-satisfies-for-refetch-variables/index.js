"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
var utils_1 = require("@typescript-eslint/utils");
var ts = __importStar(require("typescript"));
var utilities_1 = require("../utilities/utilities");
var createRule = utils_1.ESLintUtils.RuleCreator(function () {
    return "https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/require-satisfies-for-refetch-variables/README.md";
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
var checkSatisfies = function (context, node) {
    var parserServices = context.sourceCode.parserServices;
    if (!(parserServices === null || parserServices === void 0 ? void 0 : parserServices.esTreeNodeToTSNodeMap)) {
        throw new Error('This rule requires `parserOptions.project`.');
    }
    var tsNode = parserServices.esTreeNodeToTSNodeMap.get(node); // TypeScriptのASTノードを取得
    if (tsNode.kind !== ts.SyntaxKind.SatisfiesExpression) {
        context.report({ node: node, messageId: 'requireSatisfiesForRefetchVariables' });
    }
};
var checkRefetchQuery = function (context, node) {
    node.properties.forEach(function (p) {
        if (!(0, utilities_1.isProperty)(p))
            return;
        // 通常のパターン
        if (!(0, utilities_1.isIdentifier)(p.value) && isVariables(p)) {
            checkSatisfies(context, p.value);
        }
        // variablesが変数に切り出されているパターン
        if ((0, utilities_1.isIdentifier)(p.value)) {
            var variablesScope = context.sourceCode.getScope(p);
            var variables = variablesScope.set.get(p.value.name);
            variables === null || variables === void 0 ? void 0 : variables.references.forEach(function (r) {
                var parent = r.identifier.parent;
                if ((0, utilities_1.isVariableDeclarator)(parent) && (0, utilities_1.isObjectExpression)(parent.init)) {
                    checkSatisfies(context, parent.init);
                }
            });
        }
    });
};
var checkRefetchQueries = function (context, node) {
    node.elements.forEach(function (e) {
        // 通常のパターン
        if ((0, utilities_1.isObjectExpression)(e)) {
            checkRefetchQuery(context, e);
        }
        // refetchQueriesのオブジェクトが外に切り出しているパターン
        if ((0, utilities_1.isIdentifier)(e)) {
            var refetchQueryScope = context.sourceCode.getScope(e);
            var refetchQuery = refetchQueryScope.set.get(e.name);
            refetchQuery === null || refetchQuery === void 0 ? void 0 : refetchQuery.references.forEach(function (r) {
                var parent = r.identifier.parent;
                if ((0, utilities_1.isVariableDeclarator)(parent) && (0, utilities_1.isObjectExpression)(parent.init)) {
                    checkRefetchQuery(context, parent.init);
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
    name: 'require-satisfies-for-refetch-variables',
    defaultOptions: [],
    meta: {
        type: 'problem',
        docs: {
            description: 'The refetchQueries property should use the satisfies operator to ensure type safety and prevent unexpected runtime errors.',
        },
        messages: {
            requireSatisfiesForRefetchVariables: 'The refetchQueries property should use the satisfies operator to ensure type safety and prevent unexpected runtime errors.',
        },
        /**
         * If your rule doesn’t have options, do not set schema: false, but simply omit the schema property or use schema: []
         * @see https://eslint.org/docs/latest/extend/custom-rules#options-schemas
         */
        schema: [],
    },
    create: function (context) {
        return {
            // MEMO: もし解析時間がかかりそうなら〇〇.generated.tsからフィルタリングするのアリかも
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
                    // 通常のパターン
                    if ((0, utilities_1.isArrayExpression)(property.value)) {
                        checkRefetchQueries(context, property.value);
                    }
                    // refetchQueriesの配列が外に切り出しているパターン
                    if ((0, utilities_1.isIdentifier)(property.key)) {
                        var refetchQueriesScope = context.sourceCode.getScope(node);
                        var refetchQueries = refetchQueriesScope.set.get(property.key.name);
                        refetchQueries === null || refetchQueries === void 0 ? void 0 : refetchQueries.references.forEach(function (r) {
                            var parent = r.identifier.parent;
                            if ((0, utilities_1.isVariableDeclarator)(parent) &&
                                (0, utilities_1.isArrayExpression)(parent.init)) {
                                checkRefetchQueries(context, parent.init);
                            }
                        });
                    }
                }
            },
        };
    },
});
