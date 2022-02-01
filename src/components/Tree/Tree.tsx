import React, { Fragment, Key, useEffect, useState } from 'react';
import { get } from 'lodash';
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

  return (
    <Fragment>
      {highlightedNodes.map((item: NodeObjectType, index) => (
        // @ts-ignore
        <TreeNode<NodeObjectType, LeafType>
          {...item}
          key={(get(item, idKey) as Key) || index}
          {...props}
        />
      ))}
    </Fragment>
  );
}

export default Tree;
