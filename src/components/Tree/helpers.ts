import { get, clone, set, some } from 'lodash';

const hasChildren = <NodeObjectType extends { childNodes?: NodeObjectType[] }>(
  node: NodeObjectType
) => Boolean(node.childNodes && node.childNodes.length);

type HighlightNodesArgs<NodeObjectType, LeafType> = {
  nodes?: NodeObjectType[];
  regex: RegExp;
  highlightClassName?: string;
  filterHighlighted?: boolean;
  searchBy?: string;
};

export const highlightNodes = <
  NodeObjectType extends { childNodes?: NodeObjectType[] },
  LeafType
>({
  nodes,
  regex,
  filterHighlighted,
  highlightClassName,
  searchBy,
}: HighlightNodesArgs<NodeObjectType, LeafType>) => {
  const result: (NodeObjectType & { isOpen?: boolean })[] = [];

  nodes.forEach((node: NodeObjectType) => {
    const value: string = get(node, searchBy).toString();

    const shouldHighlight = regex.test(value);
    const newNode: NodeObjectType & { isOpen?: boolean } = clone(node);
    if (shouldHighlight) {
      set(
        newNode,
        searchBy,
        value.replace(regex, `<span class=${highlightClassName}>$&</span>`)
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
