import _ from 'lodash';

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
    const shouldHighlight = regex.test(_.get(node, searchBy));
    const newNode = _.clone(node);
    if (shouldHighlight) {
      _.set(
        newNode,
        searchBy,
        _.get(node, searchBy).replace(
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
        newNode.isOpen = _.some(newNode.childNodes, 'isOpen');
      }
    }

    if (!filterHighlighted || newNode.isOpen) {
      result.push(newNode);
    }
  });

  return result;
};
