"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    'disallow-identifiers': {
        meta: {
            docs: {
                description: 'disallow identifiers',
                category: 'Possible Errors',
            },
            schema: [],
        },
        create: (context) => {
            return {
                Identifier(node) {
                    context.report({
                        node,
                        message: 'Identifiers not allowed for Super Important reasons.',
                    });
                },
            };
        },
    },
};
