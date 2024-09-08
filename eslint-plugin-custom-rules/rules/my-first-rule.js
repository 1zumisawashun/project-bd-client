"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule = {
    meta: {
        docs: {
            description: 'This rule is run on typescript!',
        },
    },
    create: (context) => {
        return {
            VariableDeclarator: (node) => {
                if (node.id.type === 'Identifier' && node.id.name !== 'bla') {
                    context.report({
                        node,
                        message: 'All variabled should be named "bla"!',
                    });
                }
            },
        };
    },
};
exports.default = rule;
