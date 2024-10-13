/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Modalをfragmentに直接入れないでください。',
    },
  },
  create(context) {
    return {
      JSXElement(node) {
        const { openingElement } = node;
        if (openingElement.name && openingElement.name.name === 'Modal') {
          const parent = context.getAncestors().pop();
          if (parent && parent.type === 'JSXFragment') {
            context.report({
              node,
              message: 'Modalをfragmentに直接入れないでください。',
            });
          }
        }
      },
    };
  },
};