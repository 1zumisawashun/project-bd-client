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
exports.isUseFormContext = exports.isUseForm = exports.checkSetValue = exports.createRule = void 0;
const utils_1 = require("@typescript-eslint/utils");
const path = __importStar(require("path"));
/** @see https://github.com/mkpoli/eslint-plugin-no-array-concat/blob/master/src/utils.ts */
exports.createRule = utils_1.ESLintUtils.RuleCreator((name) => {
    const dirname = path.relative(__dirname, path.dirname(name));
    const basename = path.basename(name, path.extname(name));
    console.log(dirname, basename);
    console.log(name);
    return `https://github.com/1zumisawashun/project-bd-client/blob/main/eslint-plugin-custom-rules/src/${dirname}/${basename}.md`;
});
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
    context.report({
        node,
        messageId: 'requireShouldDirty',
    });
};
const hasShouldDirty = (objectExpression) => {
    return objectExpression.properties.some((p) => {
        if (p.type === utils_1.AST_NODE_TYPES.Property &&
            p.key.type === utils_1.AST_NODE_TYPES.Identifier) {
            return p.key.name === 'shouldDirty';
        }
        return false;
    });
};
const checkSetValue = (context, callExpression) => {
    const secondArgument = callExpression.arguments.at(1);
    const thirdArgument = callExpression.arguments.at(2);
    if (secondArgument && !thirdArgument) {
        reportThirdArgument(context, callExpression);
    }
    if (thirdArgument?.type === utils_1.AST_NODE_TYPES.ObjectExpression) {
        if (!hasShouldDirty(thirdArgument)) {
            reportShouldDirty(context, thirdArgument);
        }
    }
};
exports.checkSetValue = checkSetValue;
const isUseForm = (node) => {
    return (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator &&
        node.init?.type === utils_1.AST_NODE_TYPES.CallExpression &&
        node.init?.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
        node.init?.callee.name === 'useForm');
};
exports.isUseForm = isUseForm;
const isUseFormContext = (node) => {
    return (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator &&
        node.init?.type === utils_1.AST_NODE_TYPES.CallExpression &&
        node.init?.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
        node.init?.callee.name === 'useFormContext');
};
exports.isUseFormContext = isUseFormContext;
