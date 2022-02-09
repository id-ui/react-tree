import React, { Fragment, Key, useEffect, useState } from 'react';
import { get } from '../../helpers';
import TreeNode from '../TreeNode';
import { highlightNodes } from './helpers';
import { TreeProps } from './types';

function Tree<
  NodeObjectType extends { childNodes?: NodeObjectType[] },
  LeafType
>({
  nodes = [],
  search,
  filterHighlighted = false,
  highlightClassName = 'highlight',
  idKey = 'id',
  searchBy = 'label',
  renderLeaf,
  ...props
}: TreeProps<NodeObjectType, LeafType>) {
  const [highlightedNodes, setHighlightedNodes] = useState(nodes);

  useEffect(() => {
    if (!search) {
      setHighlightedNodes(nodes);
    } else {
      setHighlightedNodes(
        highlightNodes({
          nodes,
          regex: new RegExp(search, 'ig'),
          filterHighlighted,
          highlightClassName,
          searchBy,
        })
      );
    }
  }, [search, filterHighlighted, nodes, highlightClassName, searchBy]);

  const treeNodeProps = props as LeafType;

  return (
    <Fragment>
      {highlightedNodes.map((item: NodeObjectType, index) => (
        <TreeNode<NodeObjectType, LeafType>
          {...item}
          key={get<Key>(item, idKey) || index}
          renderLeaf={renderLeaf}
          {...treeNodeProps}
        />
      ))}
    </Fragment>
  );
}

export default Tree;
