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
const utils_1 = require("@typescript-eslint/utils");
const path = __importStar(require("path"));
/** @see https://github.com/mkpoli/eslint-plugin-no-array-concat/blob/master/src/utils.ts */
const createRule = utils_1.ESLintUtils.RuleCreator((name) => {
    const dirname = path.relative(__dirname, path.dirname(name));
    const basename = path.basename(name, path.extname(name));
    return `https://github.com/mkpoli/eslint-plugin-no-array-concat/blob/master/docs/${dirname}/${basename}.md`;
});
/** @see https://github.com/andykao1213/eslint-plugin-react-hook-form/blob/f210951a28db93ca456f877832bba479826d7e0b/lib/rules/no-nested-object-setvalue.js */
exports.rule = createRule({
    name: 'require-should-dirty-option',
    defaultOptions: [],
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce using shouldDirty: true in the second argument of setValue in react-hook-form for better state management.',
        },
        fixable: 'code',
        messages: {
            requireShouldDirtyOption: 'You must set shouldDirty: true when calling setValue for optimal performance and state consistency.',
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
        const reportCallExpression = (callExpression) => {
            context.report({
                node: callExpression,
                messageId: 'requireShouldDirtyOption',
            });
        };
        const reportObjectExpression = (objectExpression) => {
            const hasShouldDirty = objectExpression.properties.some((p) => {
                if (p.type === utils_1.AST_NODE_TYPES.Property &&
                    p.key.type === utils_1.AST_NODE_TYPES.Identifier) {
                    return p.key.name === 'shouldDirty';
                }
                return false;
            });
            if (hasShouldDirty)
                return;
            const defaultOptions = objectExpression.properties.reduce((acc, cur) => {
                if (cur.type === utils_1.AST_NODE_TYPES.Property &&
                    cur.key.type === utils_1.AST_NODE_TYPES.Identifier &&
                    cur.value.type === utils_1.AST_NODE_TYPES.Literal) {
                    acc[cur.key.name] = cur.value.value;
                }
                return acc;
            }, {});
            const optionsWithShouldDirty = formatObjectToString(Object.assign(Object.assign({}, defaultOptions), { shouldDirty: true }));
            context.report({
                node: objectExpression,
                messageId: 'requireShouldDirtyOption',
                fix(fixer) {
                    return fixer.replaceText(objectExpression, `${optionsWithShouldDirty}`);
                },
            });
        };
        const formatObjectToString = (obj) => {
            return JSON.stringify(obj, null, 2)
                .replace(/"([^"]+)":/g, '$1:')
                .replace(/"/g, '')
                .trim();
        };
        const isUseForm = (node) => {
            var _a, _b, _c;
            return (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator &&
                ((_a = node.init) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.CallExpression &&
                ((_b = node.init) === null || _b === void 0 ? void 0 : _b.callee.type) === utils_1.AST_NODE_TYPES.Identifier &&
                ((_c = node.init) === null || _c === void 0 ? void 0 : _c.callee.name) === 'useForm');
        };
        const isUseFormContext = (node) => {
            var _a, _b, _c;
            return (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator &&
                ((_a = node.init) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.CallExpression &&
                ((_b = node.init) === null || _b === void 0 ? void 0 : _b.callee.type) === utils_1.AST_NODE_TYPES.Identifier &&
                ((_c = node.init) === null || _c === void 0 ? void 0 : _c.callee.name) === 'useFormContext');
        };
        /** @see https://zenn.dev/cybozu_frontend/articles/ts-eslint-new-syntax */
        return {
            VariableDeclarator: (node) => {
                var _a;
                // NOTE: useFormかuseFormContextをサポートする
                if (isUseForm(node) || isUseFormContext(node)) {
                    // NOTE: const { setValue } = useForm(); or const { setValue } = useFormContext(); をサポートする
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
                    /**
                     * setValueのnodeを取得する。
                     * const nodeSource = sourceCode.getText(node); でも取得できそう
                     * @see https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/#context.getscope()
                     * @see https://eslint.org/docs/latest/extend/custom-rules#accessing-the-source-text
                     */
                    if (((_a = property === null || property === void 0 ? void 0 : property.value) === null || _a === void 0 ? void 0 : _a.type) !== utils_1.AST_NODE_TYPES.Identifier)
                        return;
                    const setValue = context.sourceCode
                        .getScope(node)
                        .set.get(property.value.name);
                    /**
                     * NOTE: setValueの引数の処理
                     * @see https://eslint.org/docs/latest/extend/custom-rules#scope-variables
                     */
                    setValue === null || setValue === void 0 ? void 0 : setValue.references.forEach((r) => {
                        if (r.identifier.parent.type === utils_1.AST_NODE_TYPES.CallExpression) {
                            const callExpression = r.identifier.parent;
                            const thirdArgument = callExpression.arguments.at(2);
                            if ((thirdArgument === null || thirdArgument === void 0 ? void 0 : thirdArgument.type) === utils_1.AST_NODE_TYPES.ObjectExpression) {
                                reportObjectExpression(thirdArgument);
                            }
                            else {
                                reportCallExpression(callExpression);
                            }
                        }
                    });
                }
            },
        };
    },
});
/**
 * 実装メモ
 * プロパティアクセスをするためには毎回AST_NODE_TYPESを使ってtypeGuardをする必要がある
 * そのためにそれぞれのオブジェクトはtypeを持っているのか
 * getScopeの分割代入での取り出しはngぽい、npm run lint:jsで怒られた、確かそれっぽいドキュメントがあったような気がする
 */
