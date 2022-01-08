import { get, clone, set, some } from 'lodash';

const hasChildren = (node) =>
  Boolean(node.childNodes && node.childNodes.length);

export const highlightNodes = ({
  nodes,
  regex,
  filterHighlighted,
  highlightClassName,
  searchBy,
}) => {
  const result = [];

  nodes.forEach((node) => {
    const shouldHighlight = regex.test(get(node, searchBy));
    const newNode = clone(node);
    if (shouldHighlight) {
      set(
        newNode,
        searchBy,
        get(node, searchBy).replace(
          regex,
          `<span class=${highlightClassName}>$&</span>`
        )
      );
      newNode.isOpen = true;
    }
    if (hasChildren(node)) {
      newNode.childNodes = highlightNodes({
        nodes: node.childNodes,
        regex,
        filterHighlighted,
        highlightClassName,
        searchBy,
      });
      if (!newNode.isOpen) {
        newNode.isOpen = some(newNode.childNodes, 'isOpen');
      }
    }

    if (!filterHighlighted || newNode.isOpen) {
      result.push(newNode);
    }
  });

  return result;
};
