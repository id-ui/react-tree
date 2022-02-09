import { get, set } from '../../helpers';

const hasChildren = <NodeObjectType extends { childNodes?: NodeObjectType[] }>(
  node: NodeObjectType
) => Boolean(node.childNodes && node.childNodes.length);

type HighlightNodesArgs<NodeObjectType> = {
  nodes?: NodeObjectType[];
  regex: RegExp;
  highlightClassName?: string;
  filterHighlighted?: boolean;
  searchBy?: string;
};

export const highlightNodes = <
  NodeObjectType extends {
    childNodes?: (NodeObjectType & { isOpen?: boolean })[];
  }
>({
  nodes,
  regex,
  filterHighlighted,
  highlightClassName,
  searchBy,
}: HighlightNodesArgs<NodeObjectType>) => {
  const result: (NodeObjectType & { isOpen?: boolean })[] = [];

  nodes.forEach((node: NodeObjectType) => {
    const value: string = get(node, searchBy).toString();

    const shouldHighlight = regex.test(value);
    const newNode: NodeObjectType & { isOpen?: boolean } = Object.assign(
      {},
      node
    );
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
        newNode.isOpen = newNode.childNodes.some((item) => item.isOpen);
      }
    }

    if (!filterHighlighted || newNode.isOpen) {
      result.push(newNode);
    }
  });

  return result;
};
