"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
var utils_1 = require("@typescript-eslint/utils");
var createRule = utils_1.ESLintUtils.RuleCreator(function () {
    return "https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/require-should-dirty/README.md";
});
var isShouldDirty = function (property) {
    return (property.type === utils_1.AST_NODE_TYPES.Property &&
        property.key.type === utils_1.AST_NODE_TYPES.Identifier &&
        property.key.name === 'shouldDirty');
};
var isSetValue = function (property) {
    return (property.type === utils_1.AST_NODE_TYPES.Property &&
        property.key.type === utils_1.AST_NODE_TYPES.Identifier &&
        property.key.name === 'setValue');
};
var isUseForm = function (node) {
    var _a, _b, _c;
    return (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator &&
        ((_a = node.init) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.CallExpression &&
        ((_b = node.init) === null || _b === void 0 ? void 0 : _b.callee.type) === utils_1.AST_NODE_TYPES.Identifier &&
        ((_c = node.init) === null || _c === void 0 ? void 0 : _c.callee.name) === 'useForm');
};
var isUseFormContext = function (node) {
    var _a, _b, _c;
    return (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator &&
        ((_a = node.init) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.CallExpression &&
        ((_b = node.init) === null || _b === void 0 ? void 0 : _b.callee.type) === utils_1.AST_NODE_TYPES.Identifier &&
        ((_c = node.init) === null || _c === void 0 ? void 0 : _c.callee.name) === 'useFormContext');
};
var formatObjectToString = function (obj) {
    return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:');
};
var fixShouldDirty = function (objectExpression) {
    return function (fixer) {
        var defaultOptions = objectExpression.properties.reduce(function (acc, cur) {
            if (cur.type === utils_1.AST_NODE_TYPES.Property &&
                cur.key.type === utils_1.AST_NODE_TYPES.Identifier &&
                cur.value.type === utils_1.AST_NODE_TYPES.Literal) {
                acc[cur.key.name] = cur.value.value;
            }
            return acc;
        }, {});
        var optionsWithShouldDirty = formatObjectToString(__assign(__assign({}, defaultOptions), { shouldDirty: true }));
        return fixer.replaceText(objectExpression, optionsWithShouldDirty);
    };
};
var reportShouldDirty = function (context, objectExpression) {
    context.report({
        node: objectExpression,
        messageId: 'requireShouldDirty',
        fix: fixShouldDirty(objectExpression),
    });
};
var reportThirdArgument = function (context, node) {
    context.report({ node: node, messageId: 'requireThirdArgument' });
};
var checkSetValue = function (context, callExpression) {
    var secondArgument = callExpression.arguments.at(1);
    var thirdArgument = callExpression.arguments.at(2);
    if (secondArgument && !thirdArgument) {
        reportThirdArgument(context, callExpression);
    }
    if ((thirdArgument === null || thirdArgument === void 0 ? void 0 : thirdArgument.type) === utils_1.AST_NODE_TYPES.ObjectExpression) {
        var hasShouldDirty = thirdArgument.properties.some(isShouldDirty);
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
            description: 'This custom ESLint rule enforces setting shouldDirty as the third argument of the setValue function when using the react-hook-form library.',
        },
        fixable: 'code',
        messages: {
            requireShouldDirty: 'You must set the shouldDirty option when calling the setValue function in react-hook-form to ensure that the form state (isDirty) is properly managed.',
            requireThirdArgument: 'You must set third argument when calling setValue function in react-hook-form.',
        },
        /**
         * If your rule doesn’t have options, do not set schema: false, but simply omit the schema property or use schema: []
         * @see https://eslint.org/docs/latest/extend/custom-rules#options-schemas
         */
        schema: [],
    },
    create: function (context) {
        return {
            VariableDeclarator: function (node) {
                var _a;
                // `useForm`または`useFormContext`で初期化されていた場合、次に進む
                if (isUseForm(node) || isUseFormContext(node)) {
                    // `methods`が`useForm`または`useFormContext`の呼び出し結果である場合、次に進む
                    if (node.id.type === utils_1.AST_NODE_TYPES.Identifier) {
                        var methodsScope = context.sourceCode.getScope(node);
                        var methods = methodsScope.set.get(node.id.name);
                        // `methods`の参照を見つけた場合、次に進む ex) methods.setValue(), methods.getValues() etc.
                        methods === null || methods === void 0 ? void 0 : methods.references.forEach(function (r) {
                            var memberExpression = r.identifier.parent;
                            if (memberExpression.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                                memberExpression.parent.type === utils_1.AST_NODE_TYPES.CallExpression) {
                                var callExpression = memberExpression.parent;
                                checkSetValue(context, callExpression);
                            }
                        });
                    }
                    var property = node.id.type === utils_1.AST_NODE_TYPES.ObjectPattern
                        ? node.id.properties.find(isSetValue)
                        : null;
                    // `methods`が`useForm`または`useFormContext`の呼び出し結果である場合、次に進む
                    if (((_a = property === null || property === void 0 ? void 0 : property.value) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.Identifier) {
                        var setValueScope = context.sourceCode.getScope(node);
                        var setValue_1 = setValueScope.set.get(property.value.name);
                        // `setValue`の参照を見つけた場合、次に進む
                        setValue_1 === null || setValue_1 === void 0 ? void 0 : setValue_1.references.forEach(function (r) {
                            if (r.identifier.parent.type === utils_1.AST_NODE_TYPES.CallExpression) {
                                var callExpression = r.identifier.parent;
                                checkSetValue(context, callExpression);
                            }
                        });
                    }
                }
            },
        };
    },
});
