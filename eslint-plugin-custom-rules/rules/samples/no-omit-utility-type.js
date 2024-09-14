"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
const utils_1 = require("@typescript-eslint/utils");
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);
exports.rule = createRule({
    create(context) {
        return {
            TSTypeReference(node) {
                if (node.typeName.type === 'Identifier' &&
                    node.typeName.name === 'Omit') {
                    context.report({
                        node,
                        messageId: 'no-omit-utility-type',
                    });
                }
            },
        };
    },
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow the use of the `Omit` utility type',
        },
        messages: {
            'no-omit-utility-type': 'The `Omit` utility type is forbidden',
        },
        schema: [],
    },
    name: 'no-omit-utility-type',
    defaultOptions: [],
});
